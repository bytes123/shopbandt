"use strict";
const db = require("./../db");

var Category = {
  getAllCategory: function (callback) {
    let sql = "SELECT * from category";
    return db.query(sql, callback);
  },
  // getSinhVienById:function(id,callback){
  // 	return db.query("select * from category  where Id=?",[id],callback);
  // },
  // addSV:function(sinhvien,callback){
  // 	return db.query("Insert into category (name,class,dob) values(?,?,?)",[sinhvien.name,sinhvien.class,sinhvien.dob],callback);
  // },
  // deleteSV:function(id,callback){
  // 	return db.query("delete from category  where Id=?",[id],callback);
  // },
  // updateSV:function(id,sinhvien,callback){
  // 	return db.query("update category  set name=?,class=?,dob=? where Id=?",[sinhvien.name,sinhvien.class,sinhvien.dob,id],callback);
  // }
};

module.exports = Category;
