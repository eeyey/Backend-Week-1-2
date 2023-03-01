const { isValidInt } = require('./utilts');
const bigDiff = require('./bigDiff');

/**
 * Складывает числа длинной арифметики.
 *
 * @param {string | number} n1 Первое число для сложения.
 * @param {string | number} n2 Второе число для сложения.
 *
 * @return {string} Сумма чисел.
 **/

function bigSum(n1, n2) {
  if (!isValidInt(n1) || !isValidInt(n2))
    throw new Error(
      'Invalid argument value. Argument must be a string like ^(-|d)[d]{0,}$ or number.',
    );

  const num1Sign = ('' + n1)[0] === '-' ? -1 : 1;
  const num2Sign = ('' + n2)[0] === '-' ? -1 : 1;

  if (num1Sign === -1 && num2Sign === 1) {
    // -a + b = b - a
    return bigDiff(n2, (n1 + '').slice(1));
  }
  if (num1Sign === -1 && num2Sign === -1) {
    // -a + -b = -(a + b)
    return '-' + bigSum((n1 + '').slice(1), (n2 + '').slice(1));
  }
  if (num1Sign === 1 && num2Sign === -1) {
    // a + -b = a - b
    return bigDiff(n1, (n2 + '').slice(1));
  }

  // Далее числа положительны.

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

  for (let i = 0; i < Math.min(num1.length, num2.length); i++) {
    const sum = remains + num1[i] + num2[i];
    result.push(sum % 10);
    remains = Math.floor(sum / 10);
  }

  if (num2.length > num1.length) {
    for (let i = num1.length; i < num2.length; i++) {
      const sum = remains + num2[i];
      result.push(sum % 10);
      remains = Math.floor(sum / 10);
    }
  } else {
    for (let i = num2.length; i < num1.length; i++) {
      const sum = remains + num1[i];
      result.push(sum % 10);
      remains = Math.floor(sum / 10);
    }
  }

  if (remains !== 0) result.push(remains);

  return result.reverse().join('');
}

module.exports = bigSum;
