const PROFILE_MODEL = require('../../../../models/Profile');

/*
    @Route          DELETE api/profiles/me/personalrecords/:id
    @Description    delete competition from profile
    @Access         Private
*/
const DELETE_PERSONAL_RECORD = async (request, response) => {
  // Attempt to find and delete corresponding personal record
  try {
    // Find Target profile
    const TARGET_PROFILE = await PROFILE_MODEL.findOne({
      user: request.user.id
    });
    // Find personal record index
    const PR_INDEX = TARGET_PROFILE.personalRecords
      .map(personalRecord => personalRecord._id)
      .indexOf(request.params.id);
    // Splice personal records array if index is found
    if (PR_INDEX >= 0) {
      TARGET_PROFILE.personalRecords.splice(PR_INDEX, 1);
    } else {
      return response.status(400).json({ message: 'No such pr' });
    }
    // Persist change
    await TARGET_PROFILE.save();
    // Response
    response.json(TARGET_PROFILE.personalRecords);
    //
  } catch (error) {
    console.error(error.message);
    response.status(500).send('Server Error');
  }
};

module.exports = DELETE_PERSONAL_RECORD;
