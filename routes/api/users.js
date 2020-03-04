const ROUTER = require('express').Router();
const USER = require('../../models/User');
const GRAVATAR = require('gravatar');
const BCRYPT = require('bcryptjs');
const { check, validationResult } = require('express-validator');

// User data validators
const VALIDATORS = [
  // check name
  check('name', 'Name is required')
    .not()
    .isEmpty(),
  // check email
  check('email', 'Please include a valid email').isEmail(),
  // check password
  check(
    'password',
    'Please enter a password with 8 or more characters'
  ).isLength({ min: 6 })
];

//
//
// ROUTES BELOW
//
//

/*
    @Route          POST api/users
    @Description    POST a user to DB (Register)
    @Access         Public
*/
ROUTER.post('/', VALIDATORS, async (request, response) => {
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
    let user = await USER.findOne({ email });
    if (user) {
      return response
        .status(400)
        .json({ errors: [{ message: 'User already exists' }] });
    }
    // Set user gravatar from his email
    const AVATAR_OPTIONS = { s: '20', r: 'pg', d: 'mm' };
    const AVATAR = GRAVATAR.url(email, AVATAR_OPTIONS);
    // Instatiate a New User
    user = new USER({
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
    // Return JSON Web Token

    // Return Response to client
    response.send('User saved to database');
  } catch (error) {
    console.log(error.message);
    // At this line, any errors are server related
    response.status(500).send('Server error');
  }
});

// Export ROUTER
module.exports = ROUTER;
