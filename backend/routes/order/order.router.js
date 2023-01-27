const express = require("express");
const { protect } = require("../../middleware/auth.middleware");
const {
  addOrder,
  getOrderByID,
  updateOrderToPaid,
  getUserOrder,
} = require("./order.controller");

const orderRouter = express.Router();

orderRouter.route("/").post(protect, addOrder);
orderRouter.route("/userorders").get(protect, getUserOrder);
orderRouter.route("/:id").get(protect, getOrderByID);
orderRouter.route("/:id/pay").put(protect, updateOrderToPaid);

module.exports = orderRouter;
