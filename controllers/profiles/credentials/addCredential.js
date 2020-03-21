const PROFILE_MODEL = require('../../../models/Profile');
const { validationResult } = require('express-validator');

/*
    @Route          PUT api/profiles/me/credentials
    @Description    add trainer credentials
    @Access         Private
*/
const ADD_CREDENTIAL = async (request, response) => {
  const ERRORS = validationResult(request);
  // Any errors?
  if (!ERRORS.isEmpty) {
    return response.status(400).json({ errors: ERRORS.array() });
  }
  // No errors? Assign props
  const { credential, issuer, issueDate, credentialLink } = request.body;
  // Create new credential object
  const NEW_CREDENTIAL = {
    credential,
    issuer,
    issueDate,
    credentialLink
  };
  // Attempt to find profile in db and assign new credential
  try {
    const TARGET_PROFILE = await PROFILE_MODEL.findOne({
      user: request.user.id
    });
    TARGET_PROFILE.trainerCredentials.unshift(NEW_CREDENTIAL);
    // save to db
    TARGET_PROFILE.save();
    // Respond to client
    response.json(TARGET_PROFILE.trainerCredentials);
    //
  } catch (error) {
    console.error(error.message);
    response
      .status(500)
      .send('Server Error, please refer to someone in charge');
  }
};

module.exports = ADD_CREDENTIAL;
