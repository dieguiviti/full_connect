const PROFILE_MODEL = require('../../models/Profile');

/*
    @Route          GET api/profile/me
    @Description    GET current user's profile
    @Access         Private
*/
const GET_MY_PROFILE = async (request, response) => {
  try {
    // find and set Profile to the request.user.id's corresponding profile
    const PROFILE = await PROFILE_MODEL.findOne({
      user: request.user.id
    }).populate('user', ['name', 'avatar']); // Populate the user prop with name and avatar

    // No profile? Send code 400
    if (!PROFILE)
      return response
        .status(400)
        .json({ message: 'No profile yet, create one' });

    // All good, send profile to client
    response.json(PROFILE);
  } catch (error) {
    console.log(error.message);
    response.status(500).send('Server Error');
  }
};

module.exports = GET_MY_PROFILE;
