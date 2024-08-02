export const MIN_TERM_LENGTH = 2;
export const MAX_NUMBER_OF_RESULTS = 5;
export const KEY_LABEL = 'common';
export const KEY_OFFICIAL = 'official';
export const KEY_SCORE = 'score';
export const OUTPUT_OPTIONS = [{ value: 'cca2', label: 'ISO 3166-1 alpha-2 (CCA2)'}, { value: 'cca3', label: 'ISO 3166-1 alpha-3 (CCA3)' }, { value: 'ccn3', label: 'ISO 3166-1 numeric (CCN3)' }, { value: 'cioc', label: 'International Olympic Committee (CIOC)' }];
export const DELIMITERS = [{ value: ';', label: 'Semicolon' }, { value: ',', label: 'Comma' }, { value: '&Tab;', label: 'Tab' }];
export const SPLIT_CHARS = [{ value: '\n', label: 'New line' }, { value: ',', label: 'Comma' }, { value: ';', label: 'Semicolon' }];

export const INPUT_TEMPLATE = `St. Kitts and Nevis
St Kitts and Nevis
Saint Kitts and Nevis
Deutschland
Duetschland
1) São Tomé und Príncipe
2) Sao Tome und Principe
Vietnam
Viet nam
Congo, Republic
DR Congo
Democratic Republic of the Congo
🇨🇿

1. Iran
2. Iraq
3. Irak
4. Ira
Barcelona
USA
US
Saint Martin
Georgia
Guyana`;