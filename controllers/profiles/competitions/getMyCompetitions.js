const PROFILE_MODEL = require('../../../models/Profile');

/*
    @Route          GET api/profiles/me/competitions
    @Description    Get all competitions
    @Access         Private
*/
const GET_MY_COMPETITIONS = async (request, response) => {
  // Attemp to find target profile credentials and serve them
  try {
    // Get target profile
    const TARGET_PROFILE = await PROFILE_MODEL.findOne({
      user: request.user.id
    });
    // Show competitions
    if (TARGET_PROFILE.competitions.length == 0) {
      response.json({ message: 'No competitions here, Go ahead and add one' });
    } else {
      response.json(TARGET_PROFILE.competitions);
    }
    //
  } catch (error) {
    console.error(error.message);
    response.status(500).send('Server Error');
  }
};

module.exports = GET_MY_COMPETITIONS;
