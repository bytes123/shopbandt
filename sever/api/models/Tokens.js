"use strict";
const db = require("../db");

var Tokens = {
  getTokens: function (callback) {
    let sql = "SELECT token FROM tokens";
    db.query(sql, callback);
  },
  addToken: function (data, callback) {
    let sql = "INSERT INTO tokens SET ?;";
    db.query(sql, [data], callback);
  },
  deleteToken: function (token_id, callback) {
    let sql = "DELETE FROM tokens WHERE token = ?;";
    db.query(sql, [token_id], callback);
  },
  deleteExpiredToken: function (callback) {
    let sql = "DELETE FROM tokens WHERE current_timestamp() >= expired_date";
    db.query(sql, callback);
  },
  newRefreshToken: function (old_token, new_token, callback) {
    let sql = "UPDATE tokens SET token = ? WHERE token = ?";
    db.query(sql, [old_token, new_token], callback);
  },
};

module.exports = Tokens;
