const asyncHandler = require("express-async-handler");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const paybalMethod = (req, res) => {
  res.send(process.env.PAYPAL_CLINET_ID);
};

const stripMethod = asyncHandler(async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.json({ paymentIntent });
  } catch (error) {
    console.log({ error });
    res.status(404);
    throw new Error(error);
  }
});

module.exports = { paybalMethod, stripMethod };
