"use strict";

const Category = require("../models/Category");
module.exports = {
  get(req, res) {
    Category.getAllCategory((err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
};
