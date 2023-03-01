const bigSum = require('../bigSum');

describe('bigSum test', () => {
  test('bigSum equal', () => {
    expect(bigSum('12', 12)).toBe('24');
    expect(bigSum('99', 99)).toBe('198');
    expect(bigSum(99, '99')).toBe('198');
    expect(bigSum('999', '999')).toBe('1998');
    expect(bigSum('12312836217863', '1232193218')).toBe('12314068411081');
    expect(bigSum('0', '999')).toBe('999');
    expect(
      bigSum('12352163721567316247874219', '1236712567352634512647128'),
    ).toBe('13588876288919950760521347');
    expect(
      bigSum(
        '99999999999999999999999999999999999999999999999999999999999999999',
        '99999999999999999999999999999999999999999999999999999999999999',
      ),
    ).toBe(
      '100099999999999999999999999999999999999999999999999999999999999998',
    );
    expect(
      bigSum(
        '99999999999999999999999999999999999999999999999999999999999999999',
        '99999999999999999999999999999999999999999999999999999999999999999',
      ),
    ).toBe(
      '199999999999999999999999999999999999999999999999999999999999999998',
    );

    expect(bigSum(-123, -123678)).toBe(-123 + -123678 + '');
    expect(bigSum(1258, -123678)).toBe(1258 + -123678 + '');
    expect(bigSum(0, -123678)).toBe(0 + -123678 + '');
    expect(bigSum(0, -0)).toBe(0 + -0 + '');
    expect(
      bigSum(
        '-99999999999999999999999999999999999999999999999999999999999999999',
        '99999999999999999999999999999999999999999999999999999999999999999',
      ),
    ).toBe('0');
    expect(
      bigSum(
        '99999999999999999999999999999999999999999999999999999999999999999',
        '-9999999999999999999999999999999999999999999999999999999999999999',
      ),
    ).toBe('90000000000000000000000000000000000000000000000000000000000000000');
  });

  test('bigSum wrong first parameter', () => {
    expect(() => bigSum(false, 1)).toThrow(Error);
    expect(() => bigSum(null, 1)).toThrow(Error);
    expect(() => bigSum(undefined, 1)).toThrow(Error);
    expect(() => bigSum({}, 1)).toThrow(Error);
    expect(() => bigSum(() => {}, 1)).toThrow(Error);
    expect(() => bigSum('21321321321ad', 1)).toThrow(Error);
    expect(() => bigSum('-asdsasd131adas', 1)).toThrow(Error);
  });
  test('bigSum wrong second parameter', () => {
    expect(() => bigSum(1, false)).toThrow(Error);
    expect(() => bigSum(1, null)).toThrow(Error);
    expect(() => bigSum(1, undefined)).toThrow(Error);
    expect(() => bigSum(1, {})).toThrow(Error);
    expect(() => bigSum(1, () => {})).toThrow(Error);
    expect(() => bigSum(1, '21321321321ad')).toThrow(Error);
    expect(() => bigSum(1, '-asdsasd131adas')).toThrow(Error);
  });
});
