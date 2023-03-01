const { isValidInt } = require('./utilts');
const bigSum = require('./bigSum');
const bigPositiveCompare = require('./bigPositiveCompare');
const bigAbs = require('./bigAbs');

/**
 * Считает разность чисел.
 *
 * @param {string | number} n1 Первое число.
 * @param {string | number} n2 Второе число.
 *
 * @return {string} Разность n1 - n2.
 **/

function bigDiff(n1, n2) {
  if (!isValidInt(n1) || !isValidInt(n2))
    throw new Error(
      'Invalid argument value. Argument must be a string like ^(-|d)[d]{0,}$ or number.',
    );

  const num1Sign = ('' + n1)[0] === '-' ? -1 : 1;
  const num2Sign = ('' + n2)[0] === '-' ? -1 : 1;

  if (num1Sign === -1 && num2Sign === 1) {
    return '-' + bigSum(n2, bigAbs(n1)); // -a - b = -(a + b);
  }

  if (num1Sign === -1 && num2Sign === -1) {
    return bigDiff(bigAbs(n2), bigAbs(n1)); // -a - -b = b - a
  }

  if (num1Sign === 1 && num2Sign === -1) {
    return bigSum(n1, bigAbs(n2)); // a - -b = a + b
  }

  // Далее числа положительны.

  switch (bigPositiveCompare(n1, n2)) {
    case -1: // n2 > n1
      return '-' + bigDiff(n2, n1); // if a > b: b - a = -(a-b)
    case 0:
      return '0';
  }

  const num1 = ('' + n1)
    .split('')
    .map(s => +s)
    .reverse();
  const num2 = ('' + n2)
    .split('')
    .map(s => +s)
    .reverse();

  const result = [];
  let remains = 0;

  for (let i = 0; i < num2.length; i++) {
    let sum = num1[i] - num2[i] - remains;
    if (sum < 0) {
      sum = 10 + sum;
      remains = 1;
    } else {
      remains = 0;
    }

    result.push(sum);
  }

  for (let i = num2.length; i < num1.length; i++) {
    let sum = num1[i] - remains;
    if (sum < 0) {
      sum = 10 + sum;
      remains = 1;
    } else {
      remains = 0;
    }

    result.push(sum);
  }

  let i = result.length - 1;
  while (+result[i--] === 0) {
    result.pop();
  }

  return result.reverse().join('');
}

module.exports = bigDiff;
