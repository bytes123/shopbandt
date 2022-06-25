"use strict";
const db = require("../db");

var Bills = {
  getBills: function (callback) {
    let sql = "SELECT * from bills ORDER BY create_date DESC";
    return db.query(sql, callback);
  },
  getBillsUser: function (user_id, callback) {
    let sql = "SELECT * from bills WHERE user_id = ? ORDER BY create_date DESC";
    return db.query(sql, [user_id], callback);
  },
  getBillById: function (callback) {
    let sql = "SELECT * from bills ORDER BY create_date DESC LIMIT 1";
    return db.query(sql, callback);
  },
  getDetailBill: function (data, callback) {
    let sql =
      "SELECT * from details_bill,bills,details_product,products,color,ram,rom WHERE details_bill.bill_id = ? AND details_bill.bill_id = bills.bill_id AND details_bill.details_product_id = details_product.details_product_id AND products.product_id = details_product.product_id AND details_product.product_color = color.color_id AND details_product.product_ram = ram.ram_id AND details_product.product_rom =rom.rom_id GROUP BY details_product.details_product_id ORDER BY bills.create_date DESC";
    return db.query(sql, [data.bill_id], callback);
  },
  insertBills: function (data, callback) {
    let sql = "INSERT INTO bills SET ?";
    return db.query(sql, [data], callback);
  },
  insertDetailsBill: function (data, callback) {
    let sql = "INSERT INTO details_bill SET ?";
    return db.query(sql, [data], callback);
  },
  searchBills: function (bill_id, callback) {
    let sql = "SELECT * from bills WHERE bill_id LIKE ?";
    return db.query(sql, [bill_id], callback);
  },
  searchBillsUser: function (data, callback) {
    let sql = "SELECT * from bills WHERE bill_id LIKE ? AND user_id = ?";
    return db.query(sql, ["%" + data.bill_id + "%", data.user_id], callback);
  },
  confirmBill: function (data, callback) {
    let sql =
      "UPDATE bills SET bill_statement = 1 , confirm_date = ? WHERE bill_id = ?";
    return db.query(sql, [data.confirm_date, data.bill_id], callback);
  },
  destroyBill: function (data, callback) {
    let sql =
      "UPDATE bills SET bill_statement = 2 , cancel_date = ? WHERE bill_id = ?";
    return db.query(sql, [data.cancel_date, data.bill_id], callback);
  },
  deleteBill: function (bill_id, callback) {
    let sql = "DELETE FROM bills WHERE bill_id = ?";
    return db.query(sql, [bill_id], callback);
  },
  getSalesToday: function (callback) {
    let sql =
      "SELECT SUM(bill_price) as revenue FROM bills WHERE bill_statement = 1 AND DATE(confirm_date) = CURDATE() ";
    return db.query(sql, callback);
  },
  getSalesByDate: function (date, callback) {
    let sql =
      "SELECT SUM(bill_price) as revenue FROM bills WHERE bill_statement = 1 AND DATE(confirm_date) = ? ";
    return db.query(sql, [date], callback);
  },
  getSalesByMonth: function (date, callback) {
    let sql =
      "SELECT SUM(bill_price) as revenue FROM bills WHERE bill_statement = 1 AND MONTH(confirm_date) = ? AND YEAR(confirm_date) = ?";
    return db.query(
      sql,
      [new Date(date).getMonth() + 1, new Date(date).getFullYear()],
      callback
    );
  },
  getSalesByYear: function (date, callback) {
    let sql =
      "SELECT SUM(bill_price) as revenue FROM bills WHERE bill_statement = 1 AND YEAR(confirm_date) = ? ";
    return db.query(sql, [new Date(date).getFullYear()], callback);
  },
  getSalesTomorrow: function (callback) {
    let sql =
      "SELECT SUM(bill_price) as revenue FROM bills WHERE bill_statement = 1 AND DATE(confirm_date) = CURDATE() - 1 ";
    return db.query(sql, callback);
  },
  getSalesMonth: function (callback) {
    let sql =
      "SELECT SUM(bill_price) as revenue FROM bills WHERE bill_statement = 1 AND MONTH(confirm_date) = MONTH(CURDATE()) ";
    return db.query(sql, callback);
  },
  getSalesLastMonth: function (callback) {
    let sql =
      "SELECT SUM(bill_price) as revenue FROM bills WHERE bill_statement = 1 AND MONTH(confirm_date) = MONTH(CURDATE()) -1 ";
    return db.query(sql, callback);
  },
  getSalesYear: function (callback) {
    let sql =
      "SELECT SUM(bill_price) as revenue FROM bills WHERE bill_statement = 1 AND YEAR(confirm_date) = YEAR(CURDATE()) ";
    return db.query(sql, callback);
  },
  getSalesLastYear: function (callback) {
    let sql =
      "SELECT SUM(bill_price) as revenue FROM bills WHERE bill_statement = 1 AND YEAR(confirm_date) = YEAR(CURDATE()) - 1 ";
    return db.query(sql, callback);
  },
  getSalesWeek: function (callback) {
    let sql =
      "SELECT DAYOFWEEK(confirm_date) as stat_day, SUM(bill_price) as total from bills WHERE bill_statement = 1 AND WEEKOFYEAR(confirm_date) = WEEKOFYEAR(NOW()) GROUP BY cast(confirm_date as date)";
    return db.query(sql, callback);
  },
};

module.exports = Bills;
