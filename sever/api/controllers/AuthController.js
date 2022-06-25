"use strict";

const User = require("../models/User");
const Tokens = require("../models/Tokens");
const { json } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authController = {
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.user_id,
        isAdmin: user.isAdmin,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
  },
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.user_id,
        isAdmin: user.isAdmin,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" }
    );
  },
  // ĐĂNG KÝ
  register: async (req, res) => {
    let dateNow = new Date();
    const data = req.body;
    data.createdAt = dateNow;
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(req.body.password, salt);

    const name = req.body.user_name;
    const email = req.body.email;
    try {
      await User.getUserByName(name, async (err, response) => {
        const user = response[0];

        if (user) {
          return res.json("Tài khoản đã tồn tại");
        } else {
          await User.getUserByEmail(email, async (err, response) => {
            if (err) throw err;
            const email = response[0];

            if (email) {
              return res.json("Email đã tồn tại");
            } else {
              // CREATE NEW USER
              User.setUser(data, (err, response) => {
                if (err) throw err;
                return res.status(200).json("Đăng ký thành công");
              });
            }
          });
        }
      });
    } catch (err) {}
  },
  // ĐĂNG NHẬP
  login: async (req, res) => {
    let dateNow = new Date();
    let dateExpired = new Date();

    dateExpired.setSeconds(dateExpired.getMonth() + 1);

    try {
      const name = req.body.user_name;
      const user_id = req.body.user_id;
      await User.getUserByName(name, async (err, response) => {
        const user = response[0];
        // CHECK USER
        if (!user) {
          return res.json("Tài khoản không hợp lệ");
        } else {
          // CHECK PASSWORD

          const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
          );
          if (!validPassword) {
            return res.json("Sai mật khẩu");
          }
          // CHECK BOTH USER && PASSWORD
          if (user && validPassword) {
            const accessToken = authController.generateAccessToken(user);
            const refreshToken = authController.generateRefreshToken(user);

            const data = {
              user_id: user.user_id,
              token: refreshToken,
              create_date: dateNow,
              expired_date: dateExpired,
            };

            Tokens.addToken(data, (err, response) => {
              if (err) throw err;
            });

            res.cookie("refreshToken", refreshToken, {
              httpOnly: true,
              secure: false,
              path: "/",
              sameSite: "strict",
            });
            return res.status(200).json({ user, accessToken });
          }
        }
      });
    } catch (err) {}
  },
  checkPassWord: async (req, res) => {
    const name = req.body.user_name;
    const password = req.body.password;

    await User.getUserByName(name, async (err, response) => {
      const user = response[0];

      // CHECK PASSWORD

      const validPassword = await bcrypt.compare(password, user.password);
      return res.json(validPassword);
    });
  },
  checkEmail: async (req, res) => {
    const email = req.body.email;
    await User.getUserByEmail(email, async (err, response) => {
      if (err) throw err;
      const isEmail = response[0];

      if (isEmail) {
        return res.json(true);
      } else {
        return res.json(false);
      }
    });
  },
  requestRefreshToken: async (req, res) => {
    // XÓA TOKEN HẾT HẠN
    await Tokens.deleteExpiredToken((err, response) => {
      if (err) if (err) throw err;
      console.log("1");
    });

    Tokens.getTokens((err, response) => {
      // LẤY REFRESH TOKENS TỪ DB
      const refreshTokens = response.map((token) => {
        return token.token;
      });

      // LẤY REFRESH TOKEN TỪ COOKIE
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken || refreshTokens.length == 0)
        return res.status(401).json("Vui lòng đăng nhập");

      if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json("Token hết hạn vui lòng f5");
      }

      // CẤP ACCESS TOKEN MỚI NẾU REFRESH TOKEN CÒN HẠN
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, user) => {
          if (err) {
            console.error(err);
          }
          const newAccessToken = authController.generateAccessToken(user);
          const newRefreshToken = authController.generateRefreshToken(user);

          await Tokens.newRefreshToken(
            newRefreshToken,
            refreshToken,
            (err, response) => {
              if (err) throw err;
            }
          );

          res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
          });

          return res.status(200).json({ accessToken: newAccessToken });
        }
      );
    });
  },
  userLogout: async (req, res) => {
    let refreshToken = req.cookies.refreshToken;

    await Tokens.deleteToken(refreshToken, (err, response) => {
      if (err) throw err;
    });

    res.clearCookie("refreshToken");

    return res.status(200).json({
      state: true,
      message: "Đăng xuất thành công",
    });
  },
};

//STORE TOKEN_REGEXP

module.exports = authController;
