"use strict";
const db = require("./../db");

var Filters = {
  getAllFilter: function (callback) {
    let sql = "SELECT * from price_filter ORDER BY price_filter_end ASC";
    return db.query(sql, callback);
  },
};

module.exports = Filters;
