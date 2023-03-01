/**
 * Фильтрует товары.
 *
 * @param {Good[]} goods Массив экземпляров класса Good
 * @param {string} query Сортирующая строка вида name-contains-fd&price-=2&quantity->5&description-ends-abc
 *
 * @return {Good[]} Экземпляры, удовлетворяющие query
 **/

function filterGoods(goods, query) {
  if (!(goods instanceof Array))
    throw new Error('First argument must be array of goods: Good[]');
  if (typeof query !== 'string') throw new Error('Second string line ');

  const allowProps = ['quantity', 'price', 'description', 'name'];

  const stringPredicates = {
    contains: (prop, contains) => good =>
      good[prop].toLowerCase().includes(contains),
    ends: (prop, ends) => good => good[prop].toLowerCase().endsWith(ends),
    starts: (prop, starts) => good =>
      good[prop].toLowerCase().startsWith(starts),
  };

  const numberPredicates = {
    '>': (prop, val) => good => good[prop] > val,
    '<': (prop, val) => good => good[prop] < val,
    '=': (prop, val) => good => good[prop] === val,
  };

  let result = [...goods];

  const stringRegExp =
    /(?<prop>[^=><&\s-]+)-(?<method>[^&]+?)-(?<search>.+?)($|&)/gi;
  for (let match of query.matchAll(stringRegExp)) {
    if (!match.groups) continue;

    const { prop, method, search } = match.groups;

    if (!(method in stringPredicates))
      throw new Error(
        `Error query ${query}. Unknown filter method ${method}. Allow methods is ${Object.keys(
          stringPredicates,
        )}`,
      );

    if (!allowProps.includes(prop.toLowerCase()))
      throw new Error(
        `Error query ${query}. Getting prop ${prop}. Allow props is ${allowProps}`,
      );

    result = result.filter(stringPredicates[method](prop, search));
  }

  const numberRegExp =
    /(?<prop>[^=><&\s-]+)-(?<method>[=><]+)(?<value>.+?)(&|$)/gi;
  for (let match of query.matchAll(numberRegExp)) {
    if (!match.groups) continue;

    const { prop, method, value } = match.groups;

    if (isNaN(+value))
      throw new Error(`Error query ${query}. Filter value must be `);

    if (!allowProps.includes(prop.toLowerCase()))
      throw new Error(
        `Error query ${query}. Getting prop ${prop}. Allow props is ${allowProps}`,
      );

    if (method.length === 1) {
      result = result.filter(numberPredicates[method](prop, +value));
    } else if (method.length === 2) {
      result = result.filter(
        good =>
          numberPredicates[method[0]](prop, +value)(good) ||
          numberPredicates[method[1]](prop, +value)(good),
      );
    }
  }

  return result;
}

module.exports = filterGoods;
