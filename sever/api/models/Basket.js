"use strict";
const db = require("./../db");

var Basket = {
  getBasket: function (id, callback) {
    let sql =
      "SELECT * from basket,details_product,products,category,rom,color where user_id = ? AND basket.details_product_id = details_product.details_product_id AND products.product_id = details_product.product_id AND products.category_id = category.category_id AND details_product.product_rom = rom.rom_id AND color.color_id = details_product.product_color";
    return db.query(sql, [id], callback);
  },
  getBasketByDetailId: function (details_product_id, callback) {
    let sql = "SELECT * from basket WHERE details_product_id = ?";
    return db.query(sql, [details_product_id], callback);
  },
  insertBasket: function (data, callback) {
    let sql = "INSERT INTO basket SET ? ";
    return db.query(sql, [data], callback);
  },
  increaseExistBasket: function (data, callback) {
    let sql =
      "UPDATE BASKET SET amount = amount + ? WHERE details_product_id = ? AND user_id = ?";
    return db.query(
      sql,
      [data.amount, data.details_product_id, data.user_id],
      callback
    );
  },
  increaseAmountBasket: function (data, callback) {
    let sql = "UPDATE BASKET SET amount = amount + 1 WHERE basket_id = ?";
    return db.query(sql, [data.basket_id], callback);
  },
  decreaseAmountBasket: function (data, callback) {
    let sql = "UPDATE BASKET SET amount = amount - 1 WHERE basket_id = ?";
    return db.query(sql, [data.basket_id], callback);
  },
  deleteItemBasket: function (basket_id, callback) {
    let sql = "DELETE FROM BASKET WHERE basket_id = ?";
    return db.query(sql, [basket_id], callback);
  },
  deleteUserBasket: function (user_id, callback) {
    let sql = "DELETE FROM BASKET WHERE user_id = ?";
    return db.query(sql, [user_id], callback);
  },
  changeColorItemBasket: function (data, callback) {
    let sql = "UPDATE BASKET SET details_product_id = ? WHERE basket_id = ?";
    return db.query(sql, [data.details_product_id, data.basket_id], callback);
  },
};

module.exports = Basket;
