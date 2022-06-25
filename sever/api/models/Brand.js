"use strict";
const db = require("./../db");

var Brand = {
  getBrands: function (callback) {
    let sql =
      "SELECT brand.*,category.* from brand,category WHERE brand.category_id = category.category_id ORDER BY brand.create_date DESC";
    return db.query(sql, callback);
  },
  getBrandByName: function (brand_name, callback) {
    let sql =
      "SELECT brand.*,category.* from brand,category WHERE brand.category_id = category.category_id AND brand.brand_name LIKE ? ORDER BY brand.create_date DESC";
    return db.query(sql, [brand_name], callback);
  },
  insertBrand: function (data, callback) {
    let sql = "INSERT INTO brand SET ?";
    return db.query(sql, [data], callback);
  },
  updateBrand: function (data, callback) {
    let sql = "UPDATE brand SET ? WHERE brand_id = ?";
    return db.query(sql, [data, data.brand_id], callback);
  },
  deleteBrand: function (brand_id, callback) {
    let sql = "DELETE FROM brand WHERE brand_id = ?";
    return db.query(sql, [brand_id], callback);
  },
};

module.exports = Brand;
