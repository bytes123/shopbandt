"use strict";
const db = require("./../db");

var Products = {
  getAllProduct: function (callback) {
    let sql =
      "SELECT products.*,category.category_id,category_name FROM products,category WHERE products.category_id = category.category_id ORDER BY products.create_date DESC";
    return db.query(sql, callback);
  },
  getDetailsProduct: function (callback) {
    let sql =
      "SELECT details_product.*,products.category_id,products.brand_id,brand.brand_name,products.product_name,category.category_name,color.color_id,color.color_value,ram.ram_id,ram.ram_value,rom.rom_id,rom.rom_value FROM details_product,color,ram,rom,products,category,brand WHERE details_product.product_color = color.color_id AND details_product.product_ram = ram.ram_id AND details_product.product_rom = rom.rom_id AND details_product.product_id = products.product_id AND products.category_id = category.category_id AND products.brand_id = brand.brand_id GROUP BY details_product.details_product_id  ORDER BY products.create_date DESC";
    return db.query(sql, callback);
  },
  deleteProduct: function (product_id, callback) {
    let sql = "DELETE FROM products WHERE product_id = ?";
    return db.query(sql, [product_id], callback);
  },
  deleteDetailProduct: function (details_product_id, callback) {
    let sql = "DELETE FROM details_product WHERE details_product_id = ?";
    return db.query(sql, [details_product_id], callback);
  },
  insertProduct: function (data, callback) {
    let sql = "INSERT INTO products SET ?";
    return db.query(sql, [data], callback);
  },
  insertDetailsProduct: function (data, callback) {
    let sql = "INSERT INTO details_product SET ?";
    return db.query(sql, [data], callback);
  },
  getProductsByName: function (product_name, callback) {
    let sql =
      "SELECT * from details_product,products where details_product.product_id = products.product_id AND products.product_name LIKE ?";
    return db.query(sql, [product_name], callback);
  },
  updateProduct: function (productData, product_id, callback) {
    let sql = "UPDATE products SET ? WHERE product_id = ?";
    return db.query(sql, [productData, product_id], callback);
  },
  updateDetailProduct: function (data, details_product_id, callback) {
    let sql = "UPDATE details_product SET ? WHERE details_product_id =  ?";
    return db.query(sql, [data, details_product_id], callback);
  },
  updateStorageDetailProduct: function (data, callback) {
    let sql =
      "UPDATE details_product SET product_storage = product_storage - ? WHERE details_product_id =  ?";
    return db.query(
      sql,
      [data.product_storage, data.details_product_id],
      callback
    );
  },
  updateStarPoint: function (star_point, details_product_id, callback) {
    let sql =
      "UPDATE details_product SET product_star_point = ? WHERE details_product_id = ?";
    return db.query(sql, [star_point, details_product_id], callback);
  },
};

module.exports = Products;
