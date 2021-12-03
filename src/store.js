import { writable, readable, derived, get as take } from 'svelte/store';
import * as countries_raw from "./data/countries.json";
import uniq from 'lodash/uniq';
import get from 'lodash/get';
import MiniSearch from 'minisearch';

const miniSearch = new MiniSearch({
	idField: 'i',
  fields: ['name.common', 'name.official', 'cca2', 'cca3', 'cioc', 'ccn3', 'altSpellings'], // fields to index for full-text search
  storeFields: ['label'], // fields to return with search results
  searchOptions: {
    prefix: true,
    fuzzy: 0.2
  },
  extractField: (document, fieldName) => {
    return fieldName.split('.').reduce((doc, key) => doc && doc[key], document)
  }
});

const countries = countries_raw.default.map((d, i) => {
	return { ...d, label: d.name.common, i };
})

miniSearch.addAll(countries);

// export const COUNTRIES = readable([], (set) => {
//   set(countries_raw.default);
// });

export const MATCHES = writable({});
export const CUSTOM = writable({});

export const INPUT_RAW = writable(null);
export const INPUT = derived(INPUT_RAW, (i) => {
	return i ? i.split('\n').map(d => d.trim()).filter(d => d.length) : [];
});

export const UNIQUE_INPUT = derived(INPUT, (arr) => {
	return uniq(arr);
});

UNIQUE_INPUT.subscribe(data => {
	const matches = take(MATCHES)
	console.log({ matches })
	data.forEach(datum => {
		if (datum.length > 3) {
			if (matches && matches.hasOwnProperty(datum)) {
				console.log('Found in cache')
			} else {
				MATCHES.update(d => {
			    d[datum] = miniSearch.search(datum);
			    return d;
				});
			}
		}
	})
	// console.log(value);
});

export const OPTIONS = derived([UNIQUE_INPUT, MATCHES], ([input, matches]) => {
	return input.map((datum) => {
		const treffer = get(matches, [datum]);
		const warning = !treffer || treffer.length === 0;
		let status = 'ERROR';
		if (treffer && treffer.length > 0) {
			status = 'SUCCESS';

			if (treffer.length > 1) {
				const first = treffer[0].score;
				const second = treffer[1].score;
				const percent = 1 / first * second;
				if (percent > 0.9) {
					status = 'WARNING';
				}
			}
		}
		return [datum, treffer, status];
	})
})

export const PAIRS = derived([INPUT, MATCHES, CUSTOM], ([input, matches, custom]) => {
	return input.map((datum) => {
		const user = get(custom, datum);
		if (user) {
			return get(countries, [user, 'label'])
		} else {
			return get(matches, [datum, 0, 'label']);
		}
	})
})
