const jwt = require('jsonwebtoken');

class JwtManager {
  sign(payload,secret,expiresIn = '1h') {
    try {
      const token = jwt.sign(payload, secret, { expiresIn });
      return token;
    } catch (error) {
      throw error;
    }
  }

  verify(token,secret) {
    try {
      const decoded = jwt.verify(token,secret);
      return decoded;
    } catch (error) {
      throw error;
    }
  }
}


module.exports = new JwtManager