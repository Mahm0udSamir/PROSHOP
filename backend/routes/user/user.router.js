const express = require("express");
const { protect, isAdmin } = require("../../middleware/auth.middleware");
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} = require("./user.controller");

const userRouter = express.Router();

userRouter.route("/").post(registerUser).get(protect, isAdmin, getUsers);
userRouter.post("/login", authUser); // login
userRouter.route("/profile").get(protect, getUserProfile); // get profile
userRouter.route("/profile").put(protect, updateUserProfile); // update profile

module.exports = userRouter;
