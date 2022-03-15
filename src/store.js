import { writable, readable, derived, get as take } from 'svelte/store';
import * as countries_raw from "./data/countries-1.json";
import uniq from 'lodash/uniq.js';
import get from 'lodash/get.js';
import MiniSearch from 'minisearch';
import { MIN_TERM_LENGTH, OUTPUT_OPTIONS, INPUT_TEMPLATE, MAX_NUMBER_OF_RESULTS, DELIMITERS, SPLIT_CHARS } from './config.js';
import { browser } from '$app/env';

function initValue (def, key) {
	return browser ? window.localStorage.getItem(key) ?? def : def;
}

function safeValue (key, value) {
	if (browser) {
    window.localStorage.setItem(key, value);
  }
}

// Delimiter
export const DELIMITER = writable(initValue(DELIMITERS[0].value, 'cg-option-delimiter'));
DELIMITER.subscribe((value) => safeValue('cg-option-delimiter', value));

// Include Input?
export const INCLUDE_INPUT = writable(initValue(false, 'cg-option-include-input'));
INCLUDE_INPUT.subscribe((value) => safeValue('cg-option-include-input', value));

// Include Name?
export const INCLUDE_NAME = writable(initValue(false, 'cg-option-include-name'));
INCLUDE_NAME.subscribe((value) => safeValue('cg-option-include-name', value));


function getOptionValue (option) {
	return get(option, 'value');
}

export const OUTPUT = writable(initValue(getOptionValue(OUTPUT_OPTIONS[0]), 'cg-option-output'));
OUTPUT.subscribe((value) => safeValue('cg-option-output', value));

const miniSearch = new MiniSearch({
	idField: 'i',
  fields: ['label', 'cca2', 'cca3', 'cioc', 'ccn3', 'variations'], // fields to index for full-text search
  storeFields: ['label', 'official', ...OUTPUT_OPTIONS.map(o => getOptionValue(o))], // fields to return with search results
  searchOptions: {
    prefix: false,
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

export const SPLIT_CHAR = writable(initValue(getOptionValue(SPLIT_CHARS[0]), 'cg-option-split-char'));
SPLIT_CHAR.subscribe((value) => safeValue('cg-option-split-char', value));

function cleanInput (str) {
	return (str || '')
		.replace(/^[-*][\t\s]*/, '') // Replaces unordered list characters
		.replace(/^[0-9]+[.)]*[\t\s]*/, '') // Replaces ordered list characters
		.trim()
		.replace(/[sS]t[.]*\s/g, 'Saint ')
		.replace(/[rR]ep[.]*\s/g, 'Republic ')
		.replace(/[dD]em[.]*\s/g, 'Democratic ')
}

export const INPUT_RAW = writable(null);
export const INPUT = derived([INPUT_RAW, SPLIT_CHAR], ([$input, $char]) => {
	return $input ? $input.split($char).map(d => cleanInput(d)).filter(d => d.length) : [];
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
				if (percent > 0.75) {
					status = 'WARNING';
				}
			}
		}
		return [datum, treffer || [], status, selection, pair];
	})
})

export const PAIRS = derived([INPUT, MATCHES, CUSTOM, OUTPUT], ([input, matches, custom, ouput]) => {
	return input.map((datum) => {
		const user = get(custom, datum);
		const name = get(matches, [datum, user ? user : 0, 'label']);
		const code = get(matches, [datum, user ? user : 0, ouput]);
		return [datum, code, name]
	})
})
