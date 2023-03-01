const fixSpaces = require('./fixSpaces');
const { isString } = require('./utilts');

/**
 * Возвращает уникальные слова и их количество
 *
 * @param {string} str Строка, в которой считаются уникальные слова.
 *
 * @return {{
 *   [string] : number
 * }} Объект уникальных слов и их количество.
 **/

function getUniWord(str) {
  if (!isString(str))
    throw new Error('The capitalize function argument must be of string type');

  const notLetters = '!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~1234567890';

  const symbols = str.toLowerCase().split('');
  const newSymbols = [];

  for (let i = 0; i < symbols.length; i++) {
    if (!notLetters.includes(symbols[i])) newSymbols.push(symbols[i]);
    else newSymbols.push(' ');
  }

  const clearStr = fixSpaces(newSymbols.join(''), {
    trim: true,
    singleSpace: true,
  });

  const words = clearStr.split(' ');
  const result = {};

  for (const word of words) {
    if (!word) continue;

    result[word] = result[word] ? result[word] + 1 : 1;
  }

  return result;
}

module.exports = getUniWord;
