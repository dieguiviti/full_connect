const ROUTER = require('express').Router();
const AUTH = require('../../middleware/auth');
const LOGIN_USER = require('../../controllers/auth/loginUser');
const GET_MY_USER_INFO = require('../../controllers/auth/getMyUserInfo');
const { check } = require('express-validator');

// User data validators
const VALIDATORS = [
  // check email
  check('email', 'Please include a valid email').isEmail(),
  // check password
  check('password', 'A password is required to log in').exists()
];

//
//
// ROUTES BELOW
//
//

/*
    @Route          GET api/auth
    @Description    test route
    @Access         Public
*/
ROUTER.route('/').get(AUTH, GET_MY_USER_INFO);

/*
    @Route          POST api/auth
    @Description    Check a user with DB (Login)
    @Access         Public
*/
ROUTER.route('/').post(VALIDATORS, LOGIN_USER);

// Export ROUTER
module.exports = ROUTER;
