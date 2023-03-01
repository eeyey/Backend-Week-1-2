const bigDiv = require('../bigDiv');

describe('bigDiv test', () => {
  test('bigDiv equal', () => {
    expect(bigDiv(213, 412)).toBe('0');
    expect(bigDiv(0, 412)).toBe('0');
    expect(bigDiv(312, 123)).toBe(Math.floor(312 / 123) + '');
    expect(bigDiv(100, 9)).toBe(Math.floor(100 / 9) + '');
    expect(bigDiv(121, 11)).toBe(Math.floor(121 / 11) + '');
    expect(bigDiv(121, 1)).toBe(Math.floor(121 / 1) + '');
    expect(bigDiv(1411, 17)).toBe(Math.floor(1411 / 17) + '');
    expect(bigDiv(-1411, 17)).toBe(-Math.floor(1411 / 17) + '');
    expect(bigDiv(-121, 1)).toBe(-Math.floor(121 / 1) + '');
    expect(bigDiv('123721378621873238721', '12321')).toBe('10041504636139374');
    expect(bigDiv('6781263786812736781289', '-12312412421')).toBe(
      '-550766458671',
    );
    expect(bigDiv('21321321', '-12314')).toBe('-1731');
  });

  test('bigDiv zero division', () => {
    expect(() => bigDiv(121, 0)).toThrow(Error);
    expect(() => bigDiv(121, '0')).toThrow(Error);
  });

  test('bigDiv wrong first parameter', () => {
    expect(() => bigDiv(false, 1)).toThrow(Error);
    expect(() => bigDiv(null, 1)).toThrow(Error);
    expect(() => bigDiv(undefined, 1)).toThrow(Error);
    expect(() => bigDiv({}, 1)).toThrow(Error);
    expect(() => bigDiv(() => {}, 1)).toThrow(Error);
    expect(() => bigDiv('21321321321ad', 1)).toThrow(Error);
    expect(() => bigDiv('-asdsasd131adas', 1)).toThrow(Error);
  });

  test('bigDiv wrong second parameter', () => {
    expect(() => bigDiv(1, false)).toThrow(Error);
    expect(() => bigDiv(1, null)).toThrow(Error);
    expect(() => bigDiv(1, undefined)).toThrow(Error);
    expect(() => bigDiv(1, {})).toThrow(Error);
    expect(() => bigDiv(1, () => {})).toThrow(Error);
    expect(() => bigDiv(1, '21321321321ad')).toThrow(Error);
    expect(() => bigDiv(1, '-asdsasd131adas')).toThrow(Error);
  });
});
