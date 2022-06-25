"use strict";

const Products = require("../models/Products");
const jwt = require("jsonwebtoken");

var fs = require("fs");
const { json } = require("express");
var filePath = "public/resource/ProductImages/";

function authenToken(req, res, next) {
  const authorization = req.headers["authorization"];

  const token = authorization.split(" ")[1];

  if (!token) res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    console.error(err, data);
    if (err) res.sendStatus(403);
    Products.getDetailsProduct((err, response) => {
      if (err) throw err;
      res.json(response);
    });
  });
}

module.exports = {
  get: (req, res) => {
    Products.getAllProduct((err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  getDetailsProduct: (req, res) => {
    Products.getDetailsProduct((err, response) => {
      if (err) throw err;

      res.json(response);
    });
  },
  insertProduct: (req, res) => {
    const data = req.body;

    data.create_date = new Date();

    Products.insertProduct(data, (err, response) => {
      if (err) throw err;
      return res.json("Thêm loại sản phẩm thành công");
    });
  },
  insertDetailsProduct: (req, res) => {
    const image = req.file.filename;
    const data = JSON.parse(req.body.data);
    data.product_image = image;
    data.create_date = new Date();

    Products.insertDetailsProduct(data, (err, response) => {
      if (err) throw err;
      return res.json("Thêm chi tiết sản phẩm thành công");
    });
  },
  updateProduct: (req, res) => {
    const data = JSON.parse(req.body.data);
    const oldImage = data.product_image;

    const product_id = data.product_id;
    const details_product_id = data.details_product_id;
    const product_name = data.product_name;
    const category_id = data.category_id;
    const brand_id = data.brand_id;
    const productData = {
      product_name: product_name,
      category_id: category_id,
      brand_id: brand_id,
    };

    if (!req.file) {
      const detailProductData = {
        product_price: data.product_price,
        product_discount: data.product_discount,
        product_storage: data.product_storage,
        product_ram: data.product_ram,
        product_rom: data.product_rom,
        product_description: data.product_description,
      };

      Products.updateProduct(productData, product_id, (err, response) => {
        if (err) throw err;
        Products.updateDetailProduct(
          detailProductData,
          details_product_id,
          (err, response) => {
            if (err) throw err;
            return res.json("Cập nhật thành công");
          }
        );
      });
    } else {
      const newImage = req.file.filename;
      const detailProductData = {
        product_image: newImage,
        product_price: data.product_price,
        product_discount: data.product_discount,
        product_storage: data.product_storage,
        product_ram: data.product_ram,
        product_rom: data.product_rom,
        product_description: data.product_description,
      };

      fs.stat(filePath + oldImage, function (err, stats) {
        if (err) {
          return console.error(err);
        }

        fs.unlink(filePath + oldImage, function (err) {
          if (err) return console.log(err);
          Products.updateProduct(productData, product_id, (err, response) => {
            if (err) throw err;
            Products.updateDetailProduct(
              detailProductData,
              details_product_id,
              (err, response) => {
                if (err) throw err;
                res.json("Cập nhật thành công");
              }
            );
          });
        });
      });
    }
  },
  updateStorage: (req, res) => {
    const details_product_id = req.body.details_product_id;
    const product_storage = req.body.product_storage;

    const data = {
      product_storage: product_storage,
      details_product_id: details_product_id,
    };

    Products.updateStorageDetailProduct(data, (err, response) => {
      if (err) throw err;
      return res.json(response);
    });
  },
  deleteProduct: (req, res) => {
    const product_id = req.body.product_id;
    Products.getDetailsProduct((err, response) => {
      if (err) throw err;
      Products.deleteProduct(product_id, (err, rp) => {
        if (err) throw err;
        response.forEach((item) => {
          if (item.product_id == product_id) {
            fs.stat(filePath + item.product_image, function (err, stats) {
              if (err) {
                console.error(err);
              }
              fs.unlink(filePath + item.product_image, function (err) {
                if (err) return res.json("Lỗi");
              });
            });
          }
        });
        return res.json("Xóa thành công");
      });
    });
  },
  deleteDetailProduct: (req, res) => {
    const details_product_id = req.body.details_product_id;
    Products.getDetailsProduct((err, response) => {
      if (err) throw err;
      response.forEach((item) => {
        if (item.details_product_id == details_product_id) {
          fs.stat(filePath + item.product_image, function (err, stats) {
            if (err) {
              return console.error(err);
            }

            fs.unlink(filePath + item.product_image, function (err) {
              if (err) return res.json("Lỗi");
              Products.deleteDetailProduct(
                details_product_id,
                (err, response) => {
                  if (err) throw err;
                  return res.json("Xóa chi tiết thành công");
                }
              );
            });
          });
        }
      });
    });
  },
  getProductsByName: (req, res) => {
    const product_name = req.body.product_name + "%";
    Products.getProductsByName(product_name, (err, response) => {
      if (err) throw err;
      return res.json(response);
    });
  },
  checkJwt: (req, res) => {
    authenToken(req, res);
  },
};
