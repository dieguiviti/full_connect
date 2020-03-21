const PROFILE_MODEL = require('../../models/Profile');

/*
    @Route          GET api/profiles/:id
    @Description    Get profile by user id
    @Access         Public
*/
const GET_USER_PROFILE = async (request, response) => {
  try {
    // Initialize a variable containing the routed profile
    const PROFILE = await PROFILE_MODEL.findOne({
      user: request.params.id
    }).populate('user', ['name', 'avatar']);

    // Check if there is a profile for user
    if (!PROFILE)
      return response
        .status(500)
        .json({ message: 'There is no profile for this user' });

    // respond to client
    response.json(PROFILE);
    //
  } catch (error) {
    console.error(error.message);
    // Avoid mistaken server errors
    if (error.kind == 'ObjectId') {
      return response.status(400).json({ message: 'Profile not found' });
    } else {
      response.status(500).send('Server Error');
    }
  }
};

module.exports = GET_USER_PROFILE;
