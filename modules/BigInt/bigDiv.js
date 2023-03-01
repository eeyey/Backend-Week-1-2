const { isValidInt } = require('./utilts');
const bigMull = require('./bigMul');
const bigPositiveCompare = require('./bigPositiveCompare');
const bigAbs = require('./bigAbs');

/**
 * Целочисленно делит n1 на n2.
 *
 * @param {string | number} n1 Первое число.
 * @param {string | number} n2 Второе число.
 *
 * @return {string} n1 // n2
 **/

function bigDiv(n1, n2) {
  if (!isValidInt(n1) || !isValidInt(n2))
    throw new Error(
      'Invalid argument value. Argument must be a string like ^(-|d)[d]{0,}$ or number.',
    );

  const num1Sign = ('' + n1)[0] === '-' ? -1 : 1;
  const num2Sign = ('' + n2)[0] === '-' ? -1 : 1;

  const an1 = bigAbs(n1);
  const an2 = bigAbs(n2);

  if (an2 === '0') throw new Error('Zero');

  const maxLength = Math.max(an1.length, an2.length);
  const result = new Array(maxLength).fill(0);

  for (let i = 0; i < result.length; i++) {
    let isBig = true;

    result[i] = 9;

    while (isBig && result[i] > 0) {
      const curr = result.join('');
      const mul = bigMull(curr, an2);

      isBig = bigPositiveCompare(mul, an1) > 0;

      result[i]--;
    }

    if (!isBig) result[i]++;

    if (result[0] === 0) {
      // Удаляем незначащие нули
      result.shift();
      i--;
    }
  }

  if (!result.length) return '0';

  return (num1Sign * num2Sign === -1 ? '-' : '') + result.join('');
}

module.exports = bigDiv;
