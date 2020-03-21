const USER_MODEL = require('../../models/User');
const GRAVATAR = require('gravatar');
const BCRYPT = require('bcryptjs');
const JWT = require('jsonwebtoken');
const CONFIG = require('config');
const { validationResult } = require('express-validator');

/*
    @Route          POST api/users
    @Description    POST a user to DB (Register)
    @Access         Public
*/
const REGISTER_USER = async (request, response) => {
  const ERRORS = validationResult(request);
  // If ERRORS is not empty
  if (!ERRORS.isEmpty()) {
    // Return status 404 - ERRORS.array() is equal to an Array with the VALIDATOR error messages returned
    return response.status(400).json({ errors: ERRORS.array() });
  }
  // Declare and initialize instance of user props
  const { name, email, password } = request.body;

  try {
    // Attempt to find the user in the database
    let user = await USER_MODEL.findOne({ email });
    if (user) {
      return response
        .status(400)
        .json({ errors: [{ message: 'User already exists' }] });
    }
    // Set user gravatar from his email
    const AVATAR_OPTIONS = { s: '20', r: 'pg', d: 'mm' };
    const AVATAR = GRAVATAR.url(email, AVATAR_OPTIONS);
    // Instatiate a New User
    user = new USER_MODEL({
      name,
      email,
      avatar: AVATAR,
      password
    });
    // Encrypt the user's password
    const SALT = await BCRYPT.genSalt(12);
    user.password = await BCRYPT.hash(password, SALT);
    // Save User to database
    await user.save();
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

    JWT.sign(PAYLOAD, SECRET, TOKEN_OPTIONS, VERIFY_TOKEN_AND_SEND);

    // Return Response to client

    // catch server errors
  } catch (error) {
    console.log(error.message);
    // At this line, any errors are server related
    response.status(500).send('Server error');
  }
};

module.exports = REGISTER_USER;
