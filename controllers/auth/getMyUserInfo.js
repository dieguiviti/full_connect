const USER_MODEL = require('../../models/User');

/*
    @Route          GET api/auth
    @Description    test route
    @Access         Public
*/
const GET_MY_USER_INFO = async (request, response) => {
  try {
    // Find user in database with the user id corresponding to the jwt verified in with AUTH
    let user = await USER_MODEL.findById(request.user.id).select('-password');
    // Send Respose to client
    response.json(user);

    // Catch server errors
  } catch (error) {
    console.log(error.message);
    response.status(500).send('Server Error');
  }
};

module.exports = GET_MY_USER_INFO;
