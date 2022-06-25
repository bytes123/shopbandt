"use strict";
const db = require("../db");

var DetailsProduct = {
  getRams: function (callback) {
    let sql = "SELECT * from ram";
    return db.query(sql, callback);
  },
  getRoms: function (callback) {
    let sql = "SELECT * from rom";
    return db.query(sql, callback);
  },
  getColors: function (callback) {
    let sql = "SELECT * from color";
    return db.query(sql, callback);
  },
  insertRam: function (data, callback) {
    let sql = "INSERT INTO ram SET ?";
    return db.query(sql, [data], callback);
  },
  insertRom: function (data, callback) {
    let sql = "INSERT INTO rom SET ?";
    return db.query(sql, [data], callback);
  },
  insertColor: function (data, callback) {
    let sql = "INSERT INTO color SET ?";
    return db.query(sql, [data], callback);
  },
};

module.exports = DetailsProduct;
