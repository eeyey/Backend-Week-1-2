const fixSpaces = require('./fixSpaces');
const { isString } = require('./utilts');

/**
 * Возвращает количество слов в строке
 *
 * @param {string} str Строка, в которой считаются слова.
 *
 * @return {string} количество слов в строке.
 **/

function getWordCount(str) {
  if (!isString(str))
    throw new Error('The capitalize function argument must be of string type');

  const notLetters = '!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~1234567890';

  const symbols = str.split('');
  const newSymbols = [];

  for (let i = 0; i < symbols.length; i++) {
    if (!notLetters.includes(symbols[i])) newSymbols.push(symbols[i]);
    else newSymbols.push(' ');
  }

  const clearStr = fixSpaces(newSymbols.join(''), {
    trim: true,
    singleSpace: true,
  });

  return clearStr ? clearStr.split(' ').length : 0;
}

module.exports = getWordCount;
