const { UserService } = require("../services/userService.js");
const { UserRepository } = require("../repositories/userRepository.js");
const User = require("../models/User.js");
const CONSTANTS = require("../constants/index");
const asyncHandler = require("../middleware/asyncHandler.js");

const userRepo = new UserRepository(User);
const userServ = new UserService(userRepo);

//get all users
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await userServ.getUsers(req);
  res.status(users.status).json(users);
});
// Get One User By Id
exports.getUserById = asyncHandler(async (req, res, next) => {
  const user = await userServ.getUserById(req);
  res.status(user.status).json(user);
});
// create new user
exports.createUser = asyncHandler(async (req, res, next) => {
  const newUser = await userServ.AddUser(req);
  res.status(newUser.status).json(newUser);
});

// Register new user
exports.registerUser = asyncHandler(async (req, res, next) => {
  const newUser = await userServ.registerUser(req);
  res.status(newUser.status).json(newUser);
});

exports.loginUser = async (req, res) => {
  const user = await userServ.Login(req);
  res.json(user);
};

exports.updateUser = async (req, res) => {
  const response = await userServ.updateUser(req);
  return res.json(response);
};

exports.validateUser = async (req, res) => {
  const response = await userServ.validation(req);
  return res.json(response);
};

exports.deleteUser = asyncHandler(async (req, res, next) => {
  await userServ.DeleteUser(req);
  res.status(204).json({});
});
