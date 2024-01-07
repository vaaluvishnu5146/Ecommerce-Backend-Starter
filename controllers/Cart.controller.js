const CartRouter = require("express").Router();

/**
 * METHOD = GET
 * END POINT - /
 * Description - Helps us to retreive all the cart items
 */
CartRouter.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Cart fetched successfully",
  });
});

module.exports = CartRouter;
