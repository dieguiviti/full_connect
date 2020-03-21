const ROUTER = require('express').Router();
const REGISTER_USER = require('../../controllers/users/registerUser');
const { check } = require('express-validator');

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
ROUTER.route('/').post(VALIDATORS, REGISTER_USER);

// Export ROUTER
module.exports = ROUTER;
