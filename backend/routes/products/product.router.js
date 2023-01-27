const express = require("express");
const { getAllProducts, getProductByID } = require("./product.controller");

const productRouter = express.Router();

productRouter.route("/").get(getAllProducts);
productRouter.route("/:id").get(getProductByID);

module.exports = productRouter;
