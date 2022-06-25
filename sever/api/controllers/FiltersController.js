"use strict";

const Filters = require("../models/Filters");

module.exports = {
  getPrice(req, res) {
    Filters.getAllFilter((err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
};
