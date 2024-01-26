const CONSTANTS = require("../constants");
const config = require("./../config/keys");
const { HashPassword, VerifyPassword } = require("../utils/Hashing.js");
const jwt = require("jsonwebtoken");
const SendMailToUser = require("../utils/sendMail");
const { sign } = require("../utils/JWT.js");

class UserService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async AddUser(req) {
    const response = {};

    const { role, userName, email, password, active } = req.body;

    const hashedPass = await HashPassword(password);

    const newUser = {
      role,
      userName,
      email,
      hashedPass,
      password,
      active,
    };

    const user = await this.userRepo.AddUser(newUser);

    if (!user) {
      response.message = CONSTANTS.SERVER_ERROR;
      response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
      return response;
    }

    const sendedMail = await SendMailToUser({
      userEmail: newUser.email,
      userPassword: newUser.password,
    });

    response.message = CONSTANTS.USER_CREATED;
    response.status = CONSTANTS.SERVER_CREATED_HTTP_CODE;

    return response;
  }

  async DeleteUser(req) {
    const response = {};
    const { id } = parseInt(req.params);
    const recipe = await this.userRepo.DeleteUser(id);
    if (!recipe) {
      response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
      throw new Error("Couldn't delete this user" + id);
    }
    return response;
  }
}

module.exports = { UserService };
