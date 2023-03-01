const Good = require('../../models/Good');
const filterGoods = require('../filterGoods');

describe('filterGoods test', () => {
  let goods = [];
  beforeEach(() => {
    goods = [
      new Good('Детские подгузники', 'Для детей 1-4 года', 650, 51),
      new Good('Детские подгузники', 'Для детей 1-2 года', 850, 0),

      new Good('Детское питание', 'Для детей 1-4 года', 40, 510),
      new Good('Взрослые подгузники', 'Для взрослых 18+', 650, 51),
      new Good('IPhone X', 'Телефон для детей', 100000, 4),
      new Good('IPhone 6', 'Телефон для взрослых', 1000, 0),
      new Good('IPhone 7', 'Телефон для детей', 10000, 0),
      new Good('IPhone 7', 'Телефон для ..фыа.ф', 10000, 0),
    ];
  });

  test('filterGoods not empty res', () => {
    expect(filterGoods(goods, 'name-contains-подгузники')).toEqual([
      new Good('Детские подгузники', 'Для детей 1-4 года', 650, 51),
      new Good('Детские подгузники', 'Для детей 1-2 года', 850, 0),
      new Good('Взрослые подгузники', 'Для взрослых 18+', 650, 51),
    ]);

    expect(filterGoods(goods, 'quantity-=0')).toEqual([
      new Good('Детские подгузники', 'Для детей 1-2 года', 850, 0),
      new Good('IPhone 6', 'Телефон для взрослых', 1000, 0),
      new Good('IPhone 7', 'Телефон для детей', 10000, 0),
      new Good('IPhone 7', 'Телефон для ..фыа.ф', 10000, 0),
    ]);

    expect(
      filterGoods(goods, 'quantity-=0&description-contains-детей'),
    ).toEqual([
      new Good('Детские подгузники', 'Для детей 1-2 года', 850, 0),
      new Good('IPhone 7', 'Телефон для детей', 10000, 0),
    ]);

    expect(
      filterGoods(goods, 'price-<=650&description-contains-детей'),
    ).toEqual([
      new Good('Детские подгузники', 'Для детей 1-4 года', 650, 51),
      new Good('Детское питание', 'Для детей 1-4 года', 40, 510),
    ]);

    expect(
      filterGoods(
        goods,
        'price->=650&description-contains-детей&name-contains-подгузники',
      ),
    ).toEqual([
      new Good('Детские подгузники', 'Для детей 1-4 года', 650, 51),
      new Good('Детские подгузники', 'Для детей 1-2 года', 850, 0),
    ]);

    expect(
      filterGoods(
        goods,
        'price->=650&description-contains-детей&name-starts-детские',
      ),
    ).toEqual([
      new Good('Детские подгузники', 'Для детей 1-4 года', 650, 51),
      new Good('Детские подгузники', 'Для детей 1-2 года', 850, 0),
    ]);

    expect(filterGoods(goods, 'price->=650&name-ends-ки')).toEqual([
      new Good('Детские подгузники', 'Для детей 1-4 года', 650, 51),
      new Good('Детские подгузники', 'Для детей 1-2 года', 850, 0),
      new Good('Взрослые подгузники', 'Для взрослых 18+', 650, 51),
    ]);
  });

  test('filterGoods empty res', () => {
    expect(
      filterGoods(goods, 'name-contains-детские&description-ends-для'),
    ).toEqual([]);
    expect(filterGoods(goods, 'price->=1412214')).toEqual([]);
    expect(filterGoods(goods, 'name-contains-iphone&price-<1000')).toEqual([]);
  });

  test('filterGoods error res', () => {
    expect(() =>
      filterGoods(goods, 'namse-contains-детские&description-ends-для'),
    ).toThrow(Error);
    expect(() => filterGoods(goods, 'pricae->=1412214')).toThrow(Error);
    expect(() => filterGoods(goods, 'pricae->=f')).toThrow(Error);
    expect(() => filterGoods({}, 'pricae->=f')).toThrow(Error);
    expect(() => filterGoods('', 'pricae->=f')).toThrow(Error);
    expect(() => filterGoods(() => {}, 'pricae->=f')).toThrow(Error);
    expect(() =>
      filterGoods(goods, 'name-containes-iphone&price-<1000'),
    ).toThrow(Error);
  });
});
