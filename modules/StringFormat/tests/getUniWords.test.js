const getUniWords = require('../getUniWords');

describe('getUniWords test', () => {
  test('getUniWords equal', () => {
    expect(getUniWords('')).toEqual({});
    expect(getUniWords('          ')).toEqual({});
    expect(getUniWords('a')).toEqual({ a: 1 });
    expect(getUniWords(' a  ')).toEqual({ a: 1 });
    expect(getUniWords('a a   a a  a  a')).toEqual({ a: 6 });
    expect(getUniWords('первое?:*?второе:?*--третье ')).toEqual({
      первое: 1,
      второе: 1,
      третье: 1,
    });
    expect(getUniWords('числа ,не, !   считаем 123 12   словоМ! ')).toEqual({
      числа: 1,
      не: 1,
      считаем: 1,
      словом: 1,
    });
    expect(getUniWords('первое?:*?второе:?первое*--третье первое')).toEqual({
      первое: 3,
      второе: 1,
      третье: 1,
    });
    expect(
      getUniWords(
        'Текст, в котором слово текст несколько раз встречается и слово тоже',
      ),
    ).toEqual({
      слово: 2,
      текст: 2,
      в: 1,
      несколько: 1,
      котором: 1,
      раз: 1,
      и: 1,
      встречается: 1,
      тоже: 1,
    });
  });

  test('getUniWords wrong data', () => {
    expect(() => getUniWords(1)).toThrow(Error);
    expect(() => getUniWords(false)).toThrow(Error);
    expect(() => getUniWords(null)).toThrow(Error);
    expect(() => getUniWords(undefined)).toThrow(Error);
    expect(() => getUniWords({})).toThrow(Error);
    expect(() => getUniWords(() => {})).toThrow(Error);
  });
});
