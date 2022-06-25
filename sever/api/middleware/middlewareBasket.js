const Basket = require("../models/Basket");
let basketCrtl = require("../controllers/BasketController");
const middlewareBasket = {
  // VerifyToken

  checkDetailsProductId: (req, res, next) => {
    const details_product_id = req.body.details_product_id;
    Basket.getBasketByDetailId(details_product_id, (err, response) => {
      if (err) throw err;
      if (response.length > 0) {
        basketCrtl.increaseExistBasket(req, res);
      } else {
        next();
      }
    });
  },
};

module.exports = middlewareBasket;
