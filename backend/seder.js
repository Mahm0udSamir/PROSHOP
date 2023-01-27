const dotenv = require("dotenv");
const connectDB = require("./config/db");

const userModel = require("./models/user.model");
const productModel = require("./models/product.model");
const orderModel = require("./models/order.model");
const USERS = require("./data/user");
const PRODUTS = require("./data/products");

connectDB();

const importData = async () => {
  try {
    await userModel.deleteMany();
    await productModel.deleteMany();
    await orderModel.deleteMany();

    const createUsers = await userModel.insertMany(USERS);
    const adminUser = createUsers[0]._id;

    const sampleProducts = PRODUTS.map((prod) => {
      return { ...prod, user: adminUser };
    });

    await productModel.insertMany(sampleProducts);
    console.log("Data imported");
  } catch (error) {
    console.error(error);
  }
};

const destroyData = async () => {
  try {
    await userModel.deleteMany();
    await productModel.deleteMany();
    await orderModel.deleteMany();

    console.log("Data Destroyed");
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
