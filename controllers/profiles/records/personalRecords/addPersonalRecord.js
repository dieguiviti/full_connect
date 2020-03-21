const PROFILE_MODEL = require('../../../../models/Profile');
const { validationResult } = require('express-validator');

/*
    @Route          PUT api/profiles/me/personalrecords
    @Description    add personal record to profile
    @Access         Private
*/
const ADD_PERSONAL_RECORD = async (request, response) => {
  const ERRORS = validationResult(request);
  // Any errors?
  if (!ERRORS.isEmpty) {
    return response.status(400).json({ errors: ERRORS.array() });
  }
  // No errors? Assign props
  const { movement, weight } = request.body;
  // Create new pr object
  const NEW_PR = {
    movement,
    weight
  };
  // Attempt to find profile in db and assign new pr
  try {
    const TARGET_PROFILE = await PROFILE_MODEL.findOne({
      user: request.user.id
    });
    TARGET_PROFILE.personalRecords.unshift(NEW_PR);
    // save to db
    TARGET_PROFILE.save();
    // Respond to client
    response.json(TARGET_PROFILE.personalRecords);
    //
  } catch (error) {
    console.error(error.message);
    response
      .status(500)
      .send('Server Error, please refer to someone in charge');
  }
};
module.exports = ADD_PERSONAL_RECORD;
