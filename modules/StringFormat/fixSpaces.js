const { isString } = require('./utilts');

// C возмодностью расширения способов форматирования строки.
// Например, когда-нибудь придется добавить пробелы вокруг "тире"
// Достаточно будет свойство '-' со значением {before: 1, after: 1}

// !! Не рекомендуется пересечение ключей как множества символов. Например, '!,.' и '.'

/**
 * Возвращает str с нормализацией пробелов.
 *
 * @param {string} str Преобразуемая строка.
 * @param {{
 *   trim?: Boolean,
 *   singleSpace?: Boolean
 *   symbols?: {
 *     [string]: {
 *      before: number,
 *      after: number,
 *      removeSpaces?: Boolean
 *     }
 *   }
 * }} options Конфиг преобразования

 *
 * @return {string} str с нормализацией пробелов.
 */

function fixSpaces(
  str,
  options = {
    symbols: {
      '!?.,': {
        before: 0,
        after: 1,
        removeSpaces: true,
      },
    },
    singleSpace: true,
    trim: true,
  },
) {
  if (!isString(str))
    throw new Error('The capitalize function argument must be of string type');

  const symbols = options.symbols ?? {};
  const trim = !!options.trim;
  const singleSpace = !!options.singleSpace;

  const s = str.split('');

  let prev = '';
  const result = [];

  iter_str: for (let i = 0; i < s.length; i++) {
    const symbol = s[i];

    for (let sym in symbols) {
      const config = symbols[sym];
      const removeSpaces = !!config.removeSpaces;

      if (!sym.includes(symbol)) continue;

      if (!Number.isInteger(config.before) || !Number.isInteger(config.after))
        throw Error(`Can't get before or after for symbols ${sym}`);

      if (removeSpaces) {
        for (let k = result.length - 1; k >= 0; k--) {
          if (result[k] === ' ') {
            result.pop();
          } else {
            break;
          }
        }
      }

      for (let k = 0; k < config.before; k++) result.push(' '); // Добавляем пробелы до
      result.push(symbol); // Добавляем символ
      for (let k = 0; k < config.after; k++) result.push(' '); // Добавляем пробелы после

      prev = config.after > 0 ? ' ' : symbol;
      continue iter_str;
    }

    if (symbol === ' ') {
      if (!singleSpace || prev !== ' ') {
        result.push(symbol);
      }
    } else {
      result.push(symbol);
    }

    prev = symbol;
  }

  const newStr = result.join('');

  return trim ? newStr.trim() : newStr;
}

module.exports = fixSpaces;
