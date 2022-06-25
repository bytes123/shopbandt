"use strict";
const db = require("./../db");

var User = {
  getAllUser: function (callback) {
    let sql = "SELECT * FROM user";
    return db.query(sql, callback);
  },
  getUserByName: function (user_name, callback) {
    let sql = "SELECT * FROM user WHERE user_name LIKE ?";
    return db.query(sql, [user_name], callback);
  },
  getUserByEmail: function (email, callback) {
    let sql = "SELECT * FROM user WHERE email = ?";
    return db.query(sql, [email], callback);
  },
  setUser: function (data, callback) {
    let sql = "INSERT INTO user SET ?;";
    db.query(sql, [data], callback);
  },
  updateRole: function (data, callback) {
    let sql = "UPDATE user SET isAdmin = ? WHERE user_id = ?";
    db.query(sql, [data.isAdmin, data.user_id], callback);
  },
  updatePassword: function (data, callback) {
    let sql = "UPDATE user SET password = ? WHERE user_name = ?";
    db.query(sql, [data.password, data.user_name], callback);
  },
  updatePasswordByMail: function (data, callback) {
    console.log(data);
    let sql = "UPDATE user SET password = ? WHERE email = ?";
    db.query(sql, [data.password, data.email], callback);
  },
  deleteUser: function (user_id, callback) {
    let sql = "DELETE FROM user WHERE user_id = ?";
    db.query(sql, [user_id], callback);
  },
  addResetToken: (data, callback) => {
    let sql = "INSERT INTO reset_tokens SET ?;";
    db.query(sql, [data], callback);
  },
  deleteResetToken: (data, callback) => {
    let sql = "DELETE FROM reset_tokens WHERE email = ?";
    db.query(sql, [data.email], callback);
  },
  getMail: (token, callback) => {
    let sql = "SELECT email from reset_tokens WHERE token = ?";
    db.query(sql, [token], callback);
  },
};

module.exports = User;
