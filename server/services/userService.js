const CONSTANTS = require("../constants");
const config = require("./../config/keys");
const { HashPassword, VerifyPassword } = require("../utils/Hashing.js");
const jwt = require("jsonwebtoken");
const SendMailToUser = require("../utils/sendMail");
// const { sign } = require("../utils/JWT.js");
const { sendResponse } = require('../Helpers/sendResponse')


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
        console.log('user ' , user);

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

    async Login(req) {
        try {
            const jwtSecret = config.jwt.secret;
            const { email, password } = req.body
            const user = await this.userRepo.Login(email)
            if (!user) {
                return sendResponse(CONSTANTS.LOGIN_ERROR, CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE)
            }
            const passwordMatch = await VerifyPassword(password, user.password)
            if (!passwordMatch) {
                return sendResponse(CONSTANTS.LOGIN_ERROR, CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE)
            }
            
            const token = jwt.sign({ userId: user._id, userName: user.userName, email: user.email, role: user.role, active: user.active ,profilePicture : user.profilePicture}, jwtSecret)
            console.log(token);
            await user.updateLastLogin();
            
            return sendResponse(CONSTANTS.USER_LOGIN_OK, CONSTANTS.SERVER_OK_HTTP_CODE, { token })
        } catch (error) {
            console.error('Error getting logged:', error.message);
        }
    }

    async updateUser(req){
        try {
            const id=req.params.id

            if(req.user.userId==id){  
                const data=req.body

                if (data.password) {
                    data.hashedPass = await HashPassword(data.password);
                    data.password = data.hashedPass;
                }
                const user = await this.userRepo.updateUser(id,data);

                if(!user){
                    return sendResponse(CONSTANTS.USER_NOT_FOUND,CONSTANTS.SERVER_ERROR_HTTP_CODE)
                }
                else{
                    return sendResponse("user updated",CONSTANTS.SERVER_OK_HTTP_CODE)
                }
            }
            return sendResponse("You are not authorized to update",CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE)
        } catch (error) {
            if (error.code === 11000) {
                // Handle the duplicate key error (E11000)
                // Return a response indicating that the category already exists
                return sendResponse(CONSTANTS.SERVER_ALREADY_EXISTS, CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE);
            }
        }
     }

     async validation(req){
        try{
            const id=req.params.id
            if(req.user.userId === id){
                const data = { active: true };
                await this.userRepo.validation(id,data);
                return sendResponse("User Activated",CONSTANTS.SERVER_OK_HTTP_CODE)
            }else{
                return sendResponse(CONSTANTS.INSUFFICIENT_PRIVILEGE,CONSTANTS.SERVER_INVALID_CREDENTIALS)
            }
        }catch (error) {
            sendResponse('something went wrong',CONSTANTS.SERVER_ERROR_HTTP_CODE)
        }
     }


}



module.exports = { UserService };
