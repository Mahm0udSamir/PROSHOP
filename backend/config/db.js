const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connectted ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error ${error.message}`);
  }
};

module.exports = connectDB;
