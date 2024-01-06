const ProductsRouter = require("express").Router();
const products = require("../products.json");

ProductsRouter.get("/", (req, res, next) => {
  res.status(200).json({
    success: true,
    data: products.data,
    message: "Products fetched successfully!!",
  });
});

ProductsRouter.get("/:subCategory", (req, res, next) => {
  const { subCategory } = req.params;

  res.status(200).json({
    success: true,
    data: subCategory
      ? products.data.filter((data) => data.subCategory === subCategory)
      : [],
    message: "Products fetched successfully!!",
  });
});

module.exports = ProductsRouter;
