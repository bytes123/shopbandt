"use strict";
const db = require("../db");

var Posts = {
  getPosts: function (product_id, callback) {
    let sql = "SELECT * FROM posts WHERE product_id = ?";
    return db.query(sql, [product_id], callback);
  },
  addPosts: function (details_product_id, callback) {
    let sql = "INSERT INTO posts SET ? WHERE details_product_id = ?";
    return db.query(sql, [details_product_id], callback);
  },
  updatePosts: function (details_product_id, callback) {
    let sql = "UPDATE posts SET description ? WHERE details_product_id = ?";
    return db.query(sql, [details_product_id], callback);
  },
};

module.exports = Posts;
