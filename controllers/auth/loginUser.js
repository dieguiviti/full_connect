const USER_MODEL = require('../../models/User');
const JWT = require('jsonwebtoken');
const CONFIG = require('config');
const BCRYPT = require('bcryptjs');
const { validationResult } = require('express-validator');

/*
    @Route          POST api/auth
    @Description    Check a user with DB (Login)
    @Access         Public
*/
const LOGIN_USER = async (request, response) => {
  const ERRORS = validationResult(request);
  // If ERRORS is not empty
  if (!ERRORS.isEmpty()) {
    // Return status 404 - ERRORS.array() is equal to an Array with the VALIDATOR error messages returned
    return response.status(400).json({ errors: ERRORS.array() });
  }
  // Declare and initialize instance of user props
  const { email, password } = request.body;

  try {
    // Attempt to find the user in the database
    let user = await USER_MODEL.findOne({ email });
    if (!user) {
      return response.status(400).json({
        errors: [{ message: 'Invalid credentials' }]
      });
    }
    // We have a user? Great, lets compare the corresponing passwords
    const IS_MATCH = await BCRYPT.compare(password, user.password);
    if (!IS_MATCH) {
      return response
        .status(400)
        .json({ errors: [{ message: 'Invalid credentials' }] });
    }
    // Assign and sign JSON Web Token
    const PAYLOAD = {
      user: {
        id: user.id
      }
    };
    const SECRET = CONFIG.get('jwtSecret');
    const TOKEN_OPTIONS = { expiresIn: 360000 };
    const VERIFY_TOKEN_AND_SEND = (error, token) => {
      if (error) throw error;
      response.json({ token });
    };
    // Sign Token and send to client
    JWT.sign(PAYLOAD, SECRET, TOKEN_OPTIONS, VERIFY_TOKEN_AND_SEND);

    // catch server errors
  } catch (error) {
    console.log(error.message);
    // At this line, any errors are server related
    response.status(500).send('Server error');
  }
};

module.exports = LOGIN_USER;
