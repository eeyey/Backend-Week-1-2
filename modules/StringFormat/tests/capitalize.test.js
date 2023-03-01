const capitalize = require('../capitalize');

describe('capitalize test', () => {
  test('capitalize equal', () => {
    expect(capitalize('')).toBe('');
    expect(capitalize('a')).toBe('A');
    expect(capitalize('AAAA ')).toBe('Aaaa ');
    expect(capitalize('aAa')).toBe('Aaa');
    expect(capitalize('aAa  asd sa dSa')).toBe('Aaa  asd sa dsa');
    expect(capitalize(' 123  aAa  asd sa dSa')).toBe(' 123  Aaa  asd sa dsa');
    expect(capitalize('    a Aa  asd ')).toBe('    A aa  asd ');
  });

  test('capitalize wrong data', () => {
    expect(() => capitalize(1)).toThrow(Error);
    expect(() => capitalize(false)).toThrow(Error);
    expect(() => capitalize(null)).toThrow(Error);
    expect(() => capitalize(undefined)).toThrow(Error);
    expect(() => capitalize({})).toThrow(Error);
    expect(() => capitalize(() => {})).toThrow(Error);
  });
});
