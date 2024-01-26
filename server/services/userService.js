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

  async getUsers(req) {
    const query = req.query.query;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || "ASC";
    const pageSize = 10;
    const skip = (page - 1) * pageSize;
    const limit = pageSize;
    const response = {};

    if (query) {
      try {
        const searchUsers = await this.userRepo.searchUsers(
          query,
          skip,
          limit,
          sort
        );
        response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
        response.data = searchUsers;
        return response;
      } catch (error) {
        return error;
      }
    } else {
      response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
      const users = await this.userRepo.getUsers(skip, limit, sort);
      response.data = users;
      return response;
    }
  }

  async getUserById(req) {
    const userId = req.profile.userId;

    const response = {};
    try {
      const user = await this.userRepo.FindById(userId);
      if (!user) {
        response.message = CONSTANTS.INVALID_USER_ID;
        response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
        return response;
      }
      response.data = {
        ...user._doc,
        creationDate: user.creationDateFormatted,
        lastLogin: user.lastLoginFormatted,
        lastUpdate: user.lastUpdateFormatted,
      };
      response.status = CONSTANTS.SERVER_OK_HTTP_CODE;

      return response;
    } catch (error) {
      response.message = error.message;
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
      return response;
    }
  }
}

module.exports = { UserService };
