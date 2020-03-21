const PROFILE_MODEL = require('../../models/Profile');

/*
    @Route          GET api/profiles
    @Description    list all profiles
    @Access         Public
*/
const GET_PROFILES = async (request, response) => {
  try {
    // Grab profiles
    const PROFILES = await PROFILE_MODEL.find().populate('user', [
      'name',
      'avatar'
    ]);
    // Respond to client
    response.json(PROFILES);
  } catch (error) {
    console.error(error.message);
    response.status(500).send('Server Error');
  }
};

module.exports = GET_PROFILES;
