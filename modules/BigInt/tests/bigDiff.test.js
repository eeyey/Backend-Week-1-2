const bigDiff = require('../bigDiff');

describe('bigDiff test', () => {
  test('bigDiff n1 >= 0 and n1 == n2', () => {
    expect(bigDiff('12', 12)).toBe('0');
    expect(bigDiff(144, '144')).toBe('0');
    expect(bigDiff('12322312312312311231', '12322312312312311231')).toBe('0');
    expect(bigDiff('0', '0')).toBe('0');
  });

  test('bigDiff n1, n2 >= 0 and n1 != n2', () => {
    expect(bigDiff('13', 12)).toBe('1');
    expect(bigDiff('12', 13)).toBe('-1');
    expect(bigDiff('12', 0)).toBe('12');
    expect(bigDiff(0, '1212412412')).toBe('-1212412412');
    expect(bigDiff('1232', '12322312312312311231')).toBe(
      '-12322312312312309999',
    );
    expect(bigDiff('12322312312312311231', '1232')).toBe(
      '12322312312312309999',
    );
    expect(
      bigDiff(
        '100000000000000000000000000000000000000000000000000000000000000000',
        '99999999999999999999999999999999999999999999999999999999999999999',
      ),
    ).toBe('1');
    expect(
      bigDiff(
        '99999999999999999999999999999999999999999999999999999999999999999',
        '100000000000000000000000000000000000000000000000000000000000124100000',
      ),
    ).toBe(
      '-99900000000000000000000000000000000000000000000000000000000124100001',
    );
  });

  test('bigDiff n1 < 0 and n1 == n2', () => {
    expect(bigDiff('-12', -12)).toBe('0');
    expect(bigDiff(-144, '-144')).toBe('0');
    expect(bigDiff('-12322312312312311231', '-12322312312312311231')).toBe('0');
    expect(bigDiff('-12322312312312311231', '-12322312312312311231')).toBe('0');
  });

  test('bigDiff n1, n2 <= 0 and n1 != n2', () => {
    expect(bigDiff('-1123213', 0)).toBe('-1123213');
    expect(bigDiff(0, '-1123213')).toBe('1123213');
    expect(bigDiff('-12322312312312311231', '-1123213')).toBe(
      '-12322312312311188018',
    );
  });

  test('bigDiff n1 != n2', () => {
    expect(bigDiff('-1123213', 12412421421421)).toBe('-12412422544634');
    expect(bigDiff('-12322312312312311231', '12322312312312311231')).toBe(
      '-24644624624624622462',
    );
    expect(bigDiff('-112321321521521', 12412421421421)).toBe(
      '-124733742942942',
    );
    expect(
      bigDiff('-9999999999999999999999999999999999', '-91999999123999999'),
    ).toBe('-9999999999999999908000000876000000');
  });

  test('bigDiff wrong first parameter', () => {
    expect(() => bigDiff(false, 1)).toThrow(Error);
    expect(() => bigDiff(null, 1)).toThrow(Error);
    expect(() => bigDiff(undefined, 1)).toThrow(Error);
    expect(() => bigDiff({}, 1)).toThrow(Error);
    expect(() => bigDiff(() => {}, 1)).toThrow(Error);
    expect(() => bigDiff('21321321321ad', 1)).toThrow(Error);
    expect(() => bigDiff('-asdsasd131adas', 1)).toThrow(Error);
  });

  test('bigDiff wrong second parameter', () => {
    expect(() => bigDiff(1, false)).toThrow(Error);
    expect(() => bigDiff(1, null)).toThrow(Error);
    expect(() => bigDiff(1, undefined)).toThrow(Error);
    expect(() => bigDiff(1, {})).toThrow(Error);
    expect(() => bigDiff(1, () => {})).toThrow(Error);
    expect(() => bigDiff(1, '21321321321ad')).toThrow(Error);
    expect(() => bigDiff(1, '-asdsasd131adas')).toThrow(Error);
  });
});
