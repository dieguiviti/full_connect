const PROFILE_MODEL = require('../../../models/Profile');

/*
    @Route          DELETE api/profiles/me/competitions/:id
    @Description    delete competition from profile
    @Access         Private
*/
const DELETE_COMPETITION = async (request, response) => {
  // Attempt to find and delete corresponding competition
  try {
    // Find Target profile
    const TARGET_PROFILE = await PROFILE_MODEL.findOne({
      user: request.user.id
    });
    // Find Competition index
    const COMPETITION_INDEX = TARGET_PROFILE.competitions
      .map(competition => competition._id)
      .indexOf(request.params.id);
    // Splice competition array if index is found
    if (COMPETITION_INDEX >= 0) {
      TARGET_PROFILE.competitions.splice(COMPETITION_INDEX, 1);
    } else {
      return response.status(400).json({ message: 'No such competition' });
    }
    // Persist change
    await TARGET_PROFILE.save();
    // Response
    response.json(TARGET_PROFILE.competitions);
    //
  } catch (error) {
    console.error(error.message);
    response.status(500).send('Server Error');
  }
};

module.exports = DELETE_COMPETITION;
