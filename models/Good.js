module.exports = class Good {
  /**
   * constructor description
   * @param {string} name Название товара
   * @param {string} description Описание товара
   * @param {number} price Цена товара
   * @param {number} quantity Количество товара
   *
   */
  constructor(name, descr, price, quantity) {
    this.description = descr;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
};
