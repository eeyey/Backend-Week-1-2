const fixSpaces = require('../fixSpaces');

describe('fixSpaces test', () => {
  test('fixSpaces equal', () => {
    expect(
      fixSpaces(
        'Вот пример строки,в которой     используются знаки препинания.После знаков должны стоять пробелы , а перед знаками их быть не должно .    Если есть лишние подряд идущие пробелы, они должны быть устранены.',
      ),
    ).toBe(
      'Вот пример строки, в которой используются знаки препинания. После знаков должны стоять пробелы, а перед знаками их быть не должно. Если есть лишние подряд идущие пробелы, они должны быть устранены.',
    );
    expect(fixSpaces('   ЫФ  ,ы фв !  А  ')).toBe('ЫФ, ы фв! А');
    expect(fixSpaces("ЫФ-%:'/<>  ,ы фв !  А  ")).toBe("ЫФ-%:'/<>, ы фв! А");
    expect(fixSpaces('  Ф,  фы в  фыв ыф й !! ')).toBe('Ф, фы в фыв ыф й!!');

    expect(fixSpaces('З , т      .')).toBe('З, т.');
    expect(fixSpaces('З , т      !!!?')).toBe('З, т!!!?');

    expect(fixSpaces(',.', {})).toBe(',.');
    expect(fixSpaces(' ,.  ', { trim: true })).toBe(',.');

    expect(
      fixSpaces(' sadsa dsa ,.  ', {
        symbols: {
          ',': {
            before: 3,
            after: 4,
          },
        },
      }),
    ).toBe(' sadsa dsa    ,    .  ');
  });
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

  test('fixSpaces wrong data', () => {
    expect(() => fixSpaces(1)).toThrow(Error);
    expect(() => fixSpaces(null)).toThrow(Error);
    expect(() => fixSpaces(undefined)).toThrow(Error);
    expect(() => fixSpaces({})).toThrow(Error);
    expect(() => fixSpaces(() => {})).toThrow(Error);

    expect(() =>
      fixSpaces(' sadsa dsa ,.  ', {
        symbols: {
          ',': {
            after: 4,
          },
        },
      }),
    ).toThrow(Error);
  });
});
