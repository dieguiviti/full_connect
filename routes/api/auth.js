const ROUTER = require('express').Router();
const AUTH = require('../../middleware/auth');
const USER = require('../../models/User');
/*
    @Route          GET api/auth
    @Description    test route
    @Access         Public
*/
ROUTER.get('/', AUTH, async (request, response) => {
  try {
    // Find user in database with the user id corresponding to the jwt verified in with AUTH
    let user = await USER.findById(request.user.id).select('-password');
    // Send Respose to client
    response.json(user);

    // Catch server errors
  } catch (error) {
    console.log(error.message);
    response.status(500).send('Server Error');
  }
});

// Export ROUTER
module.exports = ROUTER;
