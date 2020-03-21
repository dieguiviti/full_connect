const PROFILE_MODEL = require('../../../models/Profile');
/*
    @Route          GET api/profiles/me/credentials
    @Description    Get all trainer credentials
    @Access         Private
*/
const GET_MY_CREDENTIALS = async (request, response) => {
  // Attemp to find target profile credentials and serve them
  try {
    // Get target profile
    const TARGET_PROFILE = await PROFILE_MODEL.findOne({
      user: request.user.id
    });
    // Show credentials
    if (TARGET_PROFILE.trainerCredentials.length == 0) {
      response.json({ message: 'No credentials here, Go ahead and add one' });
    } else {
      response.json(TARGET_PROFILE.trainerCredentials);
    }
    //
  } catch (error) {
    console.error(error.message);
    response.status(500).send('Server Error');
  }
};

module.exports = GET_MY_CREDENTIALS;
