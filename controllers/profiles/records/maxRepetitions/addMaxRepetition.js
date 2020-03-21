const PROFILE_MODEL = require('../../../../models/Profile');
const { validationResult } = require('express-validator');

/*
    @Route          PUT api/profiles/me/maxrepetitions
    @Description    add max repetition to profile
    @Access         Private
*/
const ADD_MAX_REPETITION = async (request, response) => {
  const ERRORS = validationResult(request);
  // Any errors?
  if (!ERRORS.isEmpty) {
    return response.status(400).json({ errors: ERRORS.array() });
  }
  // No errors? Assign props
  const { movement, reps } = request.body;
  // Create new mr object
  const NEW_MR = {
    movement,
    reps
  };
  // Attempt to find profile in db and assign new mr
  try {
    const TARGET_PROFILE = await PROFILE_MODEL.findOne({
      user: request.user.id
    });
    TARGET_PROFILE.maxRepetitions.unshift(NEW_MR);
    // save to db
    TARGET_PROFILE.save();
    // Respond to client
    response.json(TARGET_PROFILE.maxRepetitions);
    //
  } catch (error) {
    console.error(error.message);
    response
      .status(500)
      .send('Server Error, please refer to someone in charge');
  }
};
module.exports = ADD_MAX_REPETITION;
