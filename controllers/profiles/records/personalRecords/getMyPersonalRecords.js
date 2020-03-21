const PROFILE_MODEL = require('../../../../models/Profile');

/*
    @Route          GET api/profiles/me/personalrecords
    @Description    Get all personalrecords
    @Access         Private
*/
const GET_MY_PERSONAL_RECORDS = async (request, response) => {
  // Attemp to find target profile personalrecords and serve them
  try {
    // Get target profile
    const TARGET_PROFILE = await PROFILE_MODEL.findOne({
      user: request.user.id
    });
    // Show personalrecords
    if (TARGET_PROFILE.personalRecords.length == 0) {
      response.json({
        message: 'No personalrecords here, Go ahead and add one'
      });
    } else {
      response.json(TARGET_PROFILE.personalRecords);
    }
    //
  } catch (error) {
    console.error(error.message);
    response.status(500).send('Server Error');
  }
};

module.exports = GET_MY_PERSONAL_RECORDS;
