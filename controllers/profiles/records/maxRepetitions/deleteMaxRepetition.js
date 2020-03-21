const PROFILE_MODEL = require('../../../../models/Profile');

/*
    @Route          DELETE api/profiles/me/maxrepetitions/:id
    @Description    delete maxrepetition from profile
    @Access         Private
*/
const DELETE_MAX_REPETITION = async (request, response) => {
  // Attempt to find and delete corresponding competition
  try {
    // Find Target profile
    const TARGET_PROFILE = await PROFILE_MODEL.findOne({
      user: request.user.id
    });
    // Find Competition index
    const MR_INDEX = TARGET_PROFILE.maxRepetitions
      .map(maxRepetition => maxRepetition._id)
      .indexOf(request.params.id);
    // Splice max repetitions array if index is found
    if (MR_INDEX >= 0) {
      TARGET_PROFILE.maxRepetitions.splice(MR_INDEX, 1);
    } else {
      return response.status(400).json({ message: 'No such mr' });
    }
    // Persist change
    await TARGET_PROFILE.save();
    // Response
    response.json(TARGET_PROFILE.maxRepetitions);
    //
  } catch (error) {
    console.error(error.message);
    response.status(500).send('Server Error');
  }
};

module.exports = DELETE_MAX_REPETITION;
