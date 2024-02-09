const CONSTANTS = require('../constants');
const { verify } = require('../Helpers/JWT');
const config = require('../config/keys');
const { sendResponse } = require('../Helpers/sendResponse');


exports.TokenCheck = (req, res, next) => {
    const jwtSecret = config.jwt.secret;
    const authHeader = req.headers.authorization || null;
    const token = authHeader && authHeader.split(' ')[1];
    try {
        const userData = verify(token, jwtSecret);
        req.user = userData

        next();
    } catch (error) {
        return res.json(sendResponse(CONSTANTS.NOT_AUTHORIZED, CONSTANTS.SERVER_INVALID_CREDENTIALS));
    }
};