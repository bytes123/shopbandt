const DetailsProduct = require("../models/DetailsProduct");
module.exports = {
  getRams(req, res) {
    DetailsProduct.getRams((err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  getRoms(req, res) {
    DetailsProduct.getRoms((err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  getColors(req, res) {
    DetailsProduct.getColors((err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  insertRam(req, res) {
    const data = req.body;
    DetailsProduct.insertRam(data, (err, response) => {
      if (err) throw err;
      return res.json("Thêm ram thành công");
    });
  },
  insertRom(req, res) {
    const data = req.body;
    DetailsProduct.insertRom(data, (err, response) => {
      if (err) throw err;
      return res.json("Thêm rom thành công");
    });
  },
  insertColor(req, res) {
    const data = req.body;
    DetailsProduct.insertColor(data, (err, response) => {
      if (err) throw err;
      return res.json("Thêm màu thành công");
    });
  },
};
