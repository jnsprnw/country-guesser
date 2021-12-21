import { writable, readable, derived, get as take } from 'svelte/store';
import * as countries_raw from "./data/countries-1.json";
import uniq from 'lodash/uniq';
import get from 'lodash/get';
import MiniSearch from 'minisearch';
import { MIN_TERM_LENGTH, OUTPUT_OPTIONS, INPUT_TEMPLATE, MAX_NUMBER_OF_RESULTS } from './config.js';

function getOptionValue (option) {
	return get(option, 'value');
}

export const OUTPUT = writable(getOptionValue(OUTPUT_OPTIONS[0]));

const miniSearch = new MiniSearch({
	idField: 'i',
  fields: ['label', 'cca2', 'cca3', 'cioc', 'ccn3', 'variations'], // fields to index for full-text search
  storeFields: ['label', ...OUTPUT_OPTIONS.map(o => getOptionValue(o))], // fields to return with search results
  searchOptions: {
    prefix: true,
    fuzzy: 0.2
  },
  extractField: (document, fieldName) => {
    return fieldName.split('.').reduce((doc, key) => doc && doc[key], document)
  }
});

// const countries = countries_raw.default.map((d, i) => {
// 	const translations = uniq(flatten(map(get(d, 'translations', {}), d => [d.official, d.common])));
// 	console.log(translations)
// 	return { ...d, label: d.name.common, i };
// })

miniSearch.addAll(countries_raw.default);

export const MATCHES = writable({});
export const CUSTOM = writable({});

export const INPUT_RAW = writable(INPUT_TEMPLATE);
export const INPUT = derived(INPUT_RAW, (i) => {
	return i ? i.split('\n').map(d => d.trim()).filter(d => d.length) : [];
});

export const UNIQUE_INPUT = derived(INPUT, (arr) => {
	return uniq(arr);
});

UNIQUE_INPUT.subscribe(data => {
	const matches = take(MATCHES)
	// console.log({ matches })
	data.forEach(datum => {
		if (datum.length >= MIN_TERM_LENGTH) {
			if (matches && matches.hasOwnProperty(datum)) {
				console.log('Found in cache')
			} else {
				MATCHES.update(d => {
			    d[datum] = miniSearch.search(datum).slice(0, MAX_NUMBER_OF_RESULTS);
			    return d;
				});
			}
		}
	})
	// console.log(value);
});

export const OPTIONS = derived([UNIQUE_INPUT, MATCHES, CUSTOM], ([input, matches, custom]) => {
	return input.map((datum) => {
		const treffer = get(matches, [datum]);
		const selection = get(custom, datum, 0);
		const pair = get(treffer, selection);
		const warning = !treffer || treffer.length === 0;
		let status = 'ERROR';
		if (treffer && treffer.length > 0) {
			status = 'SUCCESS';

			if (treffer[0].score < 30) {
				status = 'WARNING';
			} else if (treffer.length > 1) {
				const first = treffer[0].score;
				const second = treffer[1].score;
				const percent = 1 / first * second;
				if (percent > 0.9) {
					status = 'WARNING';
				}
			}
		}
		return [datum, treffer, status, selection, pair];
	})
})

export const PAIRS = derived([INPUT, MATCHES, CUSTOM, OUTPUT], ([input, matches, custom, ouput]) => {
	return input.map((datum) => {
		const user = get(custom, datum);
		const name = get(matches, [datum, user ? user : 0, 'name.common']);
		const code = get(matches, [datum, user ? user : 0, ouput]);
		return [datum, code, name]
	})
})
