import fs from 'fs';
import map from 'lodash/map.js';
import flatten from 'lodash/flatten.js';
import uniq from 'lodash/uniq.js';
import compact from 'lodash/compact.js';

const exclude = ['jpn', 'zho'];
const codes = ['cca2', 'ccn3', 'cca3', 'cioc'];

function cleanArray(arr) {
	return compact(uniq(flatten(arr)));
}

function getFromObject(obj, keys = ['official', 'common']) {
	return cleanArray(map(obj, (d, key) => {
		if (exclude.includes(key)) { return [] }
		return keys.map(key => d[key])
	}))
}

const countries = JSON.parse(fs.readFileSync('countries.json'));
// console.log(countries);
const data = countries.map((country, i) => {
	const variations = cleanArray([
		...getFromObject(country.translations),
		...getFromObject(country.name.native),
		...country.altSpellings,
		country.common,
		country.official,
		// ...codes.map(code => country[code])
	]);
	let obj = {
		i,
		label: country.name.common,
		variations
	};
	codes.forEach(code => {
		obj[code] = country[code];
	})
	return obj;
	// console.log(obj)
})

fs.writeFileSync('../src/data/countries-1.json', JSON.stringify(data));
