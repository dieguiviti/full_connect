const PROFILE_MODEL = require('../../../models/Profile');
const { validationResult } = require('express-validator');

/*
    @Route          PUT api/profiles/me/competitions
    @Description    add competition to profile
    @Access         Private
*/
const ADD_COMPETITION = async (request, response) => {
  const ERRORS = validationResult(request);
  // Any errors?
  if (!ERRORS.isEmpty) {
    return response.status(400).json({ errors: ERRORS.array() });
  }
  // No errors? Assign props
  const {
    competitionName,
    division,
    standing,
    location,
    finishDate
  } = request.body;
  // Create new credential object
  const NEW_COMPETITION = {
    competitionName,
    division,
    standing,
    location,
    finishDate
  };
  // Attempt to find profile in db and assign new credential
  try {
    const TARGET_PROFILE = await PROFILE_MODEL.findOne({
      user: request.user.id
    });
    TARGET_PROFILE.competitions.unshift(NEW_COMPETITION);
    // save to db
    TARGET_PROFILE.save();
    // Respond to client
    response.json(TARGET_PROFILE.competitions);
    //
  } catch (error) {
    console.error(error.message);
    response
      .status(500)
      .send('Server Error, please refer to someone in charge');
  }
};

module.exports = ADD_COMPETITION;
