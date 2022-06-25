"use strict";
const db = require("./../db");

var Sliders = {
  getSliders: function (id, callback) {
    let sql = "SELECT * from sliders WHERE product_id = ?";
    return db.query(sql, [id], callback);
  },
};

module.exports = Sliders;
