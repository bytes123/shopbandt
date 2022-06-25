"use strict";

const Sliders = require("../models/Sliders");
module.exports = {
  getSlider(req, res) {
    const product_id = req.body.product_id;
    Sliders.getSliders(product_id, (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
};
