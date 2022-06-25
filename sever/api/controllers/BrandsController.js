"use strict";

const Brand = require("../models/Brand");
module.exports = {
  get(req, res) {
    Brand.getBrands((err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  getBrandByName(req, res) {
    const brand_name = req.body.brand_name + "%";
    Brand.getBrandByName(brand_name, (err, response) => {
      if (err) throw err;
      return res.json(response);
    });
  },
  insertBrand(req, res) {
    const image = req.file.filename;
    const data = JSON.parse(req.body.data);
    data.brand_image = image;
    data.create_date = new Date();
    Brand.insertBrand(data, (err, response) => {
      if (err) throw err;
      return res.json("Thêm hãng thành công");
    });
  },
  updateBrand(req, res) {
    if (!req.file) {
      const data = JSON.parse(req.body.data);
      data.create_date = new Date();
      Brand.updateBrand(data, (err, response) => {
        if (err) throw err;
        return res.json("Cập nhật hãng thành công");
      });
    } else {
      const image = req.file.filename;
      const data = JSON.parse(req.body.data);
      data.brand_image = image;
      data.create_date = new Date();
      Brand.updateBrand(data, (err, response) => {
        if (err) throw err;
        return res.json("Cập nhật hãng thành công");
      });
    }
  },
  deleteBrand(req, res) {
    const brand_id = req.body.brand_id;
    Brand.deleteBrand(brand_id, (err, response) => {
      if (err) throw err;
      return res.json("Xóa hãng thành công");
    });
  },
};
