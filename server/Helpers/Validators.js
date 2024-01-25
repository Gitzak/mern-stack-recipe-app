const { body, validationResult } = require('express-validator');
  

const loginValidator = [
  body('email')
    .notEmpty()
    .withMessage('email is required'),

  body('password')
    .notEmpty()
    .withMessage('password is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
]


module.exports = { loginValidator };

