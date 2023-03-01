const { isString } = require('./utilts');

/**
 * Преобразование строки к нижнему регистру с заглавной первой буквой.
 *
 * @param {string} str Преобразуемая строка.
 *
 * @return {string} str в нижнем регистре с заглавной первой буквой.
 **/

function capitalize(str) {
  if (!isString(str))
    throw new Error('The capitalize function argument must be of string type');

  if (!str.length) return str; // Empty string;

  const notLetters = ' !"#$%&\'()*+,-./:;<=>?@[]^_`{|}~1234567890';

  const symbols = str.split('');

  let i = 0;
  for (; i < symbols.length; i++) {
    if (!notLetters.includes(symbols[i])) break;
  }

  const lowerStr = str.toLowerCase();

  return lowerStr.slice(0, i) + str[i].toUpperCase() + lowerStr.slice(i + 1);
}

module.exports = capitalize;
