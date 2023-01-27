const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const generateToken = (id) => {
  const exp = Date.now() + 3 * (60 * 60 * 1000); // 3h
  return {
    token: jwt.sign({ exp, id }, process.env.JWT_KEY),
    expireIn: exp,
  };
};

module.exports = generateToken;
