const { UserService } = require("../services/userService");
const { UserRepository } = require("../repositories/userRepository.js");
const User = require("../models/User.js");
const CONSTANTS = require("../constants/index");
const asyncHandler = require("../middleware/asyncHandler.js");

const userRepo = new UserRepository(User);
const userServ = new UserService(userRepo);

// create new user
exports.createUser = asyncHandler(async (req, res, next) => {
  const newUser = await userServ.AddUser(req);
  res.status(newUser.status).json(newUser);
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  await userServ.DeleteUser(req);
  res.status(204).json({});
});
