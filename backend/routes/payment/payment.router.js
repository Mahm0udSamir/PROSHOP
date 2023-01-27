const express = require("express");
const { stripMethod } = require("./payment.controller");

const paymentMethod = express.Router();

paymentMethod.get("/paypal", paymentMethod);
paymentMethod.post("/stripe", stripMethod);

module.exports = paymentMethod;
