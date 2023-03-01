const bigAbs = require('./bigAbs');
const { isValidInt } = require('./utilts');

/**
 * Умножает числа длинной арифметики.
 *
 * @param {string | number} a Первое число.
 * @param {string | number} b Второе число.
 *
 * @return {string} произведение чисел.
 **/

function bigMul(a, b) {
  if (!isValidInt(a) || !isValidInt(b))
    throw new Error(
      'Invalid argument value. Argument must be a string like ^(-|d)[d]{0,}$ or number.',
    );

  const n1 = a + '';
  const n2 = b + '';

  const num1Sign = n1[0] === '-' ? -1 : 1;
  const num2Sign = n2[0] === '-' ? -1 : 1;

  const num1 = bigAbs(n1)
    .split('')
    .map(s => +s)
    .reverse();
  const num2 = bigAbs(n2)
    .split('')
    .map(s => +s)
    .reverse();

  const result = new Array(num1.length * num2.length + 1).fill(0);

  for (let i = 0; i < num1.length; i++) {
    let remains = 0;

    for (let j = 0; j < num2.length; j++) {
      let sum = result[i + j] + remains + num1[i] * num2[j];
      result[i + j] = sum % 10;
      remains = Math.floor(sum / 10);
    }

    let k = num2.length;
    while (remains) {
      let sum = result[k + i] + remains;

      result[k + i] = sum % 10;
      remains = Math.floor(sum / 10);
    }
  }

  let i = result.length - 1;
  while (+result[i] === 0 && i-- > 0) {
    result.pop();
  }

  const res = result.reverse().join('');
  return (num1Sign * num2Sign === -1 && res !== '0' ? '-' : '') + res;
}

module.exports = bigMul;
