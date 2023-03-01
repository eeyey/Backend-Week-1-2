const { isValidInt } = require('./utilts');

/**
 * Сравнивает два положительных числа.
 *
 * @param {string | number} n1 Первое число.
 * @param {string | number} n2 Второе число.
 *
 * @return {1 | - 1 | 0} 1, если n1 > n2, -1, если n1 < n2 и 0, если n1 == n2.
 **/

function bigPositiveCompare(n1, n2) {
  if (!isValidInt(n1) || !isValidInt(n2))
    throw new Error(
      'Invalid argument value. Argument must be a string like ^(-|d)[d]{0,}$ or number.',
    );

  const num1 = '' + n1;
  const num2 = '' + n2;

  if (num1.length < num2.length) return -1;
  if (num2.length < num1.length) return 1;

  if (num1.length === num2.length) {
    let equalCount = 0;

    for (let i = 0; i < num1.length; i++) {
      if (+num1[i] < +num2[i]) return -1;
      if (+num1[i] > +num2[i]) return 1;

      equalCount++;
    }

    if (equalCount === num1.length) return 0;
  }

  return 1;
}

module.exports = bigPositiveCompare;
