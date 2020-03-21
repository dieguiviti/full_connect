const PROFILE_MODEL = require('../../models/Profile');
const USER_MODEL = require('../../models/User');

/*
    @Route          DELETE api/profile/me
    @Description    DELETE current user's profile, account and posts
    @Access         Private
*/
const DELETE_MY_PROFILE = async (request, response) => {
  try {
    // find and delete Profile from db
    await PROFILE_MODEL.findOneAndRemove({ user: request.user.id });
    await USER_MODEL.findOneAndRemove({ _id: request.user.id });
    // All good, send profile to client
    response.json({ message: 'User Deleted' });
    //
  } catch (error) {
    console.log(error.message);
    response.status(500).send('Server Error');
  }
};

module.exports = DELETE_MY_PROFILE;
