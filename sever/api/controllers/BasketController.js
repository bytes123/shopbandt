"use strict";

const Basket = require("../models/Basket");
const Products = require("../models/Products");

module.exports = {
  getBasket(req, res) {
    const user_id = req.body.user_id;
    Basket.getBasket(user_id, (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  insertBasket(req, res) {
    const user_id = req.body.user_id;
    const amount = req.body.amount;
    const details_product_id = req.body.details_product_id;

    const data = {
      details_product_id: details_product_id,
      user_id: user_id,
      amount: amount,
      create_date: new Date(),
    };

    Basket.insertBasket(data, (err, response) => {
      if (err) throw err;
      Basket.getBasket(user_id, (err, response) => {
        if (err) throw err;
        return res.json(response);
      });
    });
  },
  increaseExistBasket(req, res) {
    const user_id = req.body.user_id;
    const amount = req.body.amount;
    const details_product_id = req.body.details_product_id;

    const data = {
      details_product_id: details_product_id,
      user_id: user_id,
      amount: amount,
    };

    Basket.increaseExistBasket(data, (err, response) => {
      if (err) throw err;
      Basket.getBasket(user_id, (err, response) => {
        if (err) throw err;
        return res.json(response);
      });
    });
  },
  increaseAmountBasket(req, res) {
    const user_id = req.body.user_id;
    const basket_id = req.body.basket_id;

    const data = {
      basket_id: basket_id,
      user_id: user_id,
    };
    Basket.increaseAmountBasket(data, (err, response) => {
      if (err) throw err;
      Basket.getBasket(user_id, (err, response) => {
        if (err) throw err;
        res.json(response);
      });
    });
  },
  decreaseAmountBasket(req, res) {
    const user_id = req.body.user_id;
    const basket_id = req.body.basket_id;

    const data = {
      basket_id: basket_id,
      user_id: user_id,
    };
    Basket.decreaseAmountBasket(data, (err, response) => {
      if (err) throw err;
      Basket.getBasket(user_id, (err, response) => {
        if (err) throw err;
        res.json(response);
      });
    });
  },
  deleteItemBasket(req, res) {
    const user_id = req.body.user_id;
    const basket_id = req.body.basket_id;
    console.log(basket_id, user_id);
    Basket.deleteItemBasket(basket_id, (err, response) => {
      if (err) throw err;
      Basket.getBasket(user_id, (err, response) => {
        if (err) throw err;
        res.json(response);
      });
    });
  },
  deleteUserBasket(req, res) {
    const user_id = req.body.user_id;
    Basket.deleteUserBasket(user_id, (err, response) => {
      if (err) throw err;
      res.json(1);
    });
  },
  changeColorItemBasket(req, res) {
    const user_id = req.body.user_id;
    const basket_id = req.body.basket_id;
    const details_product_id = req.body.details_product_id;

    const data = {
      basket_id: basket_id,
      details_product_id: details_product_id,
    };
    Basket.changeColorItemBasket(data, (err, response) => {
      if (err) throw err;
      Basket.getBasket(user_id, (err, response) => {
        if (err) throw err;
        res.json(response);
      });
    });
  },
};
