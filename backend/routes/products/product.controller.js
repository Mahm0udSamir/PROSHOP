const asyncHandler = require("express-async-handler");
const productModel = require("../../models/product.model");

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await productModel.find();
  res.json(products);
});

const getProductByID = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await productModel.findById(id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

module.exports = {
  getAllProducts,
  getProductByID,
};
