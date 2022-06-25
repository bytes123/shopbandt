"use strict";
const db = require("../db");

var Comments = {
  getAllComments: function (callback) {
    let sql = "SELECT * from comments ORDER BY create_date DESC";
    return db.query(sql, callback);
  },
  getCommentsById: function (details_product_id, callback) {
    let sql =
      "SELECT * from comments WHERE details_product_id = ? AND comment_statement = 1 ORDER BY create_date DESC";
    return db.query(sql, [details_product_id], callback);
  },
  getAverageStarPoint: function (details_product_id, callback) {
    let sql =
      "SELECT AVG(star_point) as star_point FROM comments WHERE details_product_id = ? AND comment_statement = 1";
    return db.query(sql, [details_product_id], callback);
  },
  insertComments: function (data, callback) {
    let sql = "INSERT INTO comments SET ?";
    return db.query(sql, [data], callback);
  },
  confirmComment: function (comment_id, callback) {
    let sql = "UPDATE comments SET comment_statement = 1 WHERE comment_id = ?";
    return db.query(sql, [comment_id], callback);
  },
  deleteCommentsById: function (comment_id, callback) {
    let sql = "DELETE from comments WHERE comment_id = ?";
    return db.query(sql, [comment_id], callback);
  },
  searchComment: function (details_product_id, callback) {
    let sql = "SELECT * FROM comments WHERE details_product_id LIKE ?";

    return db.query(sql, [details_product_id], callback);
  },
};

module.exports = Comments;
