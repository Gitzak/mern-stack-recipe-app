const { UserService } = require("../services/userService.js");
const { UserRepository } = require("../repositories/userRepository.js");
const User = require('../models/User.js')
const CONSTANTS = require("../constants/index");
const asyncHandler = require("../middleware/asyncHandler.js");

const userRepo = new UserRepository(User);
const userServ = new UserService(userRepo);

// create new user
exports.createUser = asyncHandler(async (req, res, next) => {
    const newUser = await userServ.AddUser(req);
    res.status(newUser.status).json(newUser);
});

exports.loginUser = async (req, res) => {
    const user = await userServ.Login(req)
    res.json(user)
}

exports.updateUser = async (req, res) => {
    const response= await userServ.updateUser(req)
    return res.json(response)
}

exports.validateUser = async (req, res) => {
    const response= await userServ.validation(req)
    return res.json(response)
}