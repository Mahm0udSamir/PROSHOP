const asyncHandler = require("express-async-handler");
const userModel = require("../../models/user.model");
const generateToken = require("../../utils/generateToken");

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      ...generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existUser = await userModel.findOne({ email });

  if (existUser) {
    res.status(400);
    throw new Error("User is already exist");
  }

  const user = await userModel.create({ name, email, password });

  if (user) {
    res.status(201).json({
      id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      ...generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  if (req.user) {
    const { _id, name, email, isAdmin } = req.user;
    res.json({ id: _id, name, email, isAdmin });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      email: updatedUser.email,
      name: updatedUser.name,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await userModel.find();
  res.json(users);
});

module.exports = {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
};
