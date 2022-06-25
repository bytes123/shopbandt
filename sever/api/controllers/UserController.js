"use strict";

const User = require("../models/User");
const { json } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var uuidv1 = require("uuidv1");
const sendResetLink = require("./MailController");

module.exports = {
  // ĐĂNG NHẬP
  getAllUser: (req, res) => {
    User.getAllUser((err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  getUserByName: (req, res) => {
    const user_name = req.body.user_name + "%";
    User.getUserByName(user_name, (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  updateRole: (req, res) => {
    const data = req.body;
    console.log(data);
    User.updateRole(data, (err, response) => {
      if (err) throw err;
      return res.json("Cấp quyền thành công");
    });
  },
  updatePassword: async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const user_name = req.body.user_name;

    const data = {
      password: password,
      user_name: user_name,
    };

    User.updatePassword(data, (err, response) => {
      if (err) throw err;
      return res.json("Đổi mật khẩu thành công");
    });
  },
  updatePasswordByMail: async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const email = req.body.email;
    const data = {
      password: password,
      email: email,
    };

    await User.updatePasswordByMail(data, (err, response) => {
      if (err) throw err;
      User.deleteResetToken(data, (err, response) => {
        if (err) throw err;
        return res.json("Reset mật khẩu thành công");
      });
    });
  },
  deleteUser: async (req, res) => {
    const user_id = req.body.user_id;

    await User.deleteUser(user_id, (err, response) => {
      if (err) throw err;
      res.json("Xóa tài khoản thành công");
    });
  },
  requestResetPassword: async (req, res) => {
    const email = req.body.email;

    const id = uuidv1();
    const request = {
      token: id,
      email: email,
      create_date: new Date(),
    };
    await User.deleteResetToken(request, (err, response) => {
      if (err) throw err;
      User.addResetToken(request, (err, response) => {
        if (err) throw err;
        sendResetLink(email, id)
          .then((val) => {
            console.log("thành công");
            return res.json(true);
          })
          .catch((err) => {
            return res.json(false);
          });
      });
    });
  },
  getMail: async (req, res) => {
    const token = req.body.token;

    User.getMail(token, (err, response) => {
      if (err) throw err;
      if (response.length > 0) {
        res.json(response);
      } else {
        res.json(false);
      }
    });
  },
};
