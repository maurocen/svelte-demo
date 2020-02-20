export const capitalizeWord = (word) => `${word[0].toUpperCase()}${word.substr(1).toLowerCase()}`;

export const capitalize = (string) => string.split(/\s+/g).map((word) => capitalizeWord(word)).join(' ');
