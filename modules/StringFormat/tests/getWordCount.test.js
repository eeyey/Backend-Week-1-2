const getWordCount = require('../getWordCount');

describe('getWordCount test', () => {
  test('getWordCount equal', () => {
    expect(getWordCount('')).toBe(0);
    expect(getWordCount('          ')).toBe(0);
    expect(getWordCount('a')).toBe(1);
    expect(getWordCount(' a  ')).toBe(1);
    expect(getWordCount('a a   a a  a  a')).toBe(6);
    expect(getWordCount('первое?:*?второе:?*--третье ')).toBe(3);
    expect(getWordCount('числа ,не, !   считаем 123 12   словоМ! ')).toBe(4);
  });

  test('getWordCount wrong data', () => {
    expect(() => getWordCount(1)).toThrow(Error);
    expect(() => getWordCount(false)).toThrow(Error);
    expect(() => getWordCount(null)).toThrow(Error);
    expect(() => getWordCount(undefined)).toThrow(Error);
    expect(() => getWordCount({})).toThrow(Error);
    expect(() => getWordCount(() => {})).toThrow(Error);
  });
});
