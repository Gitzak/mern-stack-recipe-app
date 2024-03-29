const CONSTANTS = require("../constants");
const config = require("./../config/keys");
const { HashPassword, VerifyPassword } = require("../utils/Hashing.js");
const jwt = require("jsonwebtoken");
const sendMailToClient = require("../utils/sendMailToClient");
// const { sign } = require("../utils/JWT.js");
const { sendResponse } = require("../Helpers/sendResponse");
const cloudinary = require("../utils/cloudinary");

class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
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
                const searchUsers = await this.userRepo.searchUsers(query, skip, limit, sort);
                response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
                response.data = searchUsers;
                return response;
            } catch (error) {
                return error;
            }
        } else {
            response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
            response.data = await this.userRepo.getUsers(skip, limit, sort);
            return response;
        }
    }

    async getUserById(req) {
        const userId = req.params.id;
        // console.log(userId);
        const response = {};
        try {
            const user = await this.userRepo.FindById(userId);
            if (!user) {
                response.message = CONSTANTS.INVALID_USER_ID;
                response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
                return response;
            }
            // response.data = {
            //   ...user._doc,
            //   creationDate: user.creationDateFormatted,
            //   lastLogin: user.lastLoginFormatted,
            //   lastUpdate: user.lastUpdateFormatted,
            // };
            // console.log(response.data);
            response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
            response.message = user;
            return response;
        } catch (error) {
            response.message = error.message;
            response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
            return response;
        }
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
        console.log("user ", user);

        if (!user) {
            response.message = CONSTANTS.SERVER_ERROR;
            response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
            return response;
        }

        const sendedMail = await sendMailToClient({
            userEmail: newUser.email,
            userPassword: newUser.password,
        });

        response.message = CONSTANTS.USER_CREATED;
        response.status = CONSTANTS.SERVER_CREATED_HTTP_CODE;

        return response;
    }

    async registerUser(req) {
        const response = {};

        const { userName, email, password } = req.body;
        const file = req.file;
        let imageUrl = null;
        if (file) {
            try {
                const result = await cloudinary.uploader.upload(file.path);
                imageUrl = result.secure_url;
                // console.log(imageUrl);
            } catch (error) {
                console.error("Error uploading image to Cloudinary:", error);
                response.status = CONSTANTS.SERVER_ERROR;
                response.message = error.message || error;
                return response;
            }
        }
        const hashedPass = await HashPassword(password);
        const newUser = {
            userName,
            email,
            hashedPass,
            password,
            profilePicture: imageUrl || null,
        };
        const user = await this.userRepo.registerUser(newUser);
        if (!user) {
            response.message = CONSTANTS.SERVER_ERROR;
            response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
            return response;
        }
        const sendedMail = await sendMailToClient({
            userId: user._id,
            userEmail: user.email,
            userPassword: password,
        });
        response.message = newUser;
        response.status = CONSTANTS.SERVER_CREATED_HTTP_CODE;
        return response;
    }

    async Login(req) {
        try {
            const jwtSecret = config.jwt.secret;
            const { email, password } = req.body;
            const user = await this.userRepo.Login(email);
            if (!user) {
                return sendResponse(CONSTANTS.LOGIN_ERROR, CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE);
            }
            const passwordMatch = await VerifyPassword(password, user.password);
            if (!passwordMatch) {
                return sendResponse(CONSTANTS.LOGIN_ERROR, CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE);
            }

            const token = jwt.sign(
                {
                    userId: user._id,
                    userName: user.userName,
                    email: user.email,
                    role: user.role,
                    active: user.active,
                    profilePicture: user.profilePicture,
                },
                jwtSecret
            );
            await user.updateLastLogin();

            return sendResponse(CONSTANTS.USER_LOGIN_OK, CONSTANTS.SERVER_OK_HTTP_CODE, { token, user });
        } catch (error) {
            console.error("Error getting logged:", error.message);
        }
    }

    async updateUser(req) {
        try {
            const id = req.params.id;
            const file = req.file;
            let imageUrl = null;
            if (req.user.userId === id) {
                const data = req.body;

                if (data.password) {
                    data.hashedPass = await HashPassword(data.password);
                    data.password = data.hashedPass;
                }
                if (file) {
                    try {
                        const result = await cloudinary.uploader.upload(file.path);
                        imageUrl = result.secure_url;
                        imageUrl && (data.profilePicture = imageUrl);
                    } catch (error) {
                        console.error("Error uploading image to Cloudinary:", error);
                        throw new Error(error.message || error);
                    }
                }
                const user = await this.userRepo.updateUser(id, data);

                if (!user) {
                    return sendResponse(CONSTANTS.USER_NOT_FOUND, CONSTANTS.SERVER_ERROR_HTTP_CODE);
                } else {
                    return sendResponse("user updated", CONSTANTS.SERVER_OK_HTTP_CODE);
                }
            }
            return sendResponse("You are not authorized to update", CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE);
        } catch (error) {
            if (error.code === 11000) {
                // Handle the duplicate key error (E11000)
                // Return a response indicating that the category already exists
                return sendResponse(CONSTANTS.SERVER_ALREADY_EXISTS, CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE);
            }
        }
    }

    async validation(req) {
        try {
            const id = req.params.id;
            const user = await this.userRepo.FindById(id); //had function khss nakhd smya mn repo lidaro drari f get userbyid
            if (!user) {
                return sendResponse(CONSTANTS.USER_NOT_FOUND, CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE);
            }
            if (user.active) {
                return sendResponse("User is already activated", CONSTANTS.SERVER_OK_HTTP_CODE);
            }

            const data = { active: true };
            await this.userRepo.updateUser(id, data);

            return sendResponse("User activated successfully", CONSTANTS.SERVER_OK_HTTP_CODE);
        } catch (error) {
            sendResponse("something went wrong", CONSTANTS.SERVER_ERROR_HTTP_CODE);
        }
    }

    async DeleteUser(req) {
        const response = {};
        const id = req.params.id;
        const recipe = await this.userRepo.DeleteUser(id);
        if (!recipe) {
            response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
            throw new Error("Couldn't delete this user" + id);
        }
        return response;
    }
}

module.exports = { UserService };
