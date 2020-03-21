const PROFILE_MODEL = require('../../../models/Profile');

/*
    @Route          DELETE api/profiles/me/credentials/:id
    @Description    delete credential from profile
    @Access         Private
*/
const DELETE_CREDENTIAL = async (request, response) => {
  // Attempt to find and delete corresponding target credential
  try {
    // Target profile
    const TARGET_PROFILE = await PROFILE_MODEL.findOne({
      user: request.user.id
    });
    // Find Corresponding credential's index
    const CREDENTIAL_INDEX = TARGET_PROFILE.trainerCredentials
      .map(credential => credential._id)
      .indexOf(request.params.id);
    // Splice credentials array if index exists
    if (CREDENTIAL_INDEX >= 0) {
      TARGET_PROFILE.trainerCredentials.splice(CREDENTIAL_INDEX, 1);
    } else {
      return response.status(400).json({ message: 'No such credential' });
    }
    // Persist changes
    await TARGET_PROFILE.save();
    // Response
    response.json(TARGET_PROFILE.trainerCredentials);
    //
  } catch (error) {
    console.error(error.message);
    response.status(500).send('Server Error');
  }
};

module.exports = DELETE_CREDENTIAL;
