const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRouter = require("./routes/products/product.router");
const { notFound, errorHandler } = require("./middleware/error.middleware");
const userRouter = require("./routes/user/user.router");
const orderRouter = require("./routes/order/order.router");
const paymentMethod = require("./routes/payment/payment.router");

const app = express();
dotenv.config();
connectDB();

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/config/payment", paymentMethod);

if (process.env.NODE_DEV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "..", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server Running in ${process.env.NODE_DEV} mode on port ${PORT}`)
);
