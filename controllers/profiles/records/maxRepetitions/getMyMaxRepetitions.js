const PROFILE_MODEL = require('../../../../models/Profile');

/*
    @Route          GET api/profiles/me/maxrepetitions
    @Description    Get all maxrepetitions
    @Access         Private
*/
const GET_MY_MAX_REPETITIONS = async (request, response) => {
  // Attemp to find target profile maxrepetitions and serve them
  try {
    // Get target profile
    const TARGET_PROFILE = await PROFILE_MODEL.findOne({
      user: request.user.id
    });
    // Show maxrepetitions
    if (TARGET_PROFILE.maxRepetitions.length == 0) {
      response.json({
        message: 'No Max repetitions here, Go ahead and add one'
      });
    } else {
      response.json(TARGET_PROFILE.maxRepetitions);
    }
    //
  } catch (error) {
    console.error(error.message);
    response.status(500).send('Server Error');
  }
};

module.exports = GET_MY_MAX_REPETITIONS;
