const { isValidInt } = require('./utilts');

/**
 * Возвращает модуль числа.
 *
 * @param {string | number} n число.
 *
 * @return {string} abs(n)
 **/

function bigAbs(n) {
  if (!isValidInt(n))
    throw new Error(
      'Invalid argument value. Argument must be a string like ^(-|d)[d]{0,}$ or number.',
    );

  return ('' + n)[0] === '-' ? ('' + n).slice(1) : '' + n;
}

module.exports = bigAbs;
