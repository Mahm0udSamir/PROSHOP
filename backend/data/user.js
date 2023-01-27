const bcrypt = require("bcryptjs");

const USERS = [
  {
    name: "Juna Ahmed",
    email: "juna@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Samir Gad",
    email: "samir@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Ahmed Samir",
    email: "ahmed@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

module.exports = USERS;
