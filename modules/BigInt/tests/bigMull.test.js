const bigMul = require('../bigMul');

describe('bigMul test', () => {
  test('bigMul equal', () => {
    expect(bigMul(124128, 12124214)).toBe(124128 * 12124214 + '');
    expect(bigMul(21478, 123)).toBe(21478 * 123 + '');
    expect(bigMul(21478, 1)).toBe(21478 * 1 + '');
    expect(bigMul(21478, 9)).toBe(21478 * 9 + '');
    expect(bigMul(21478, -123)).toBe(21478 * -123 + '');
    expect(bigMul(-21478, -123)).toBe(-21478 * -123 + '');
    expect(bigMul(0, 1237123567812)).toBe(0 + '');
    expect(bigMul(-0, -123)).toBe(0 + '');
    expect(bigMul('0', -123)).toBe(0 + '');
    expect(bigMul(-2414, '0')).toBe(0 + '');
    expect(bigMul('9999999999999999999999', '999999999999999999999999')).toBe(
      '9999999999999999999998990000000000000000000001',
    );
    expect(bigMul('-1236781256378127', '861273861287391')).toBe(
      '-1065207368248660119290113296657',
    );
    expect(bigMul('-1236781256378127', '0')).toBe('0');
  });

  test('bigMul wrong first parameter', () => {
    expect(() => bigMul(false, 1)).toThrow(Error);
    expect(() => bigMul(null, 1)).toThrow(Error);
    expect(() => bigMul(undefined, 1)).toThrow(Error);
    expect(() => bigMul({}, 1)).toThrow(Error);
    expect(() => bigMul(() => {}, 1)).toThrow(Error);
    expect(() => bigMul('21321321321ad', 1)).toThrow(Error);
    expect(() => bigMul('-asdsasd131adas', 1)).toThrow(Error);
  });

  test('bigMul wrong second parameter', () => {
    expect(() => bigMul(1, false)).toThrow(Error);
    expect(() => bigMul(1, null)).toThrow(Error);
    expect(() => bigMul(1, undefined)).toThrow(Error);
    expect(() => bigMul(1, {})).toThrow(Error);
    expect(() => bigMul(1, () => {})).toThrow(Error);
    expect(() => bigMul(1, '21321321321ad')).toThrow(Error);
    expect(() => bigMul(1, '-asdsasd131adas')).toThrow(Error);
  });
});
