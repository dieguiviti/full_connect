const WOD_MODEL = require('../../models/Wod');

/*
    @Route          DELETE api/wods/:id
    @Description    DELETE single wod
    @Access         Private
*/
const DELETE_WOD = async (request, response) => {
  // Attemp to remove a single post from database
  try {
    // Assign wod to variable
    const WOD = await WOD_MODEL.findById(request.params.id);
    // Assert post existence and respond
    if (!WOD) {
      response.status(404).json({ message: 'No such WOD' });
      //
    } else if (WOD.user.toString() === request.user.id) {
      // Remove post
      await WOD_MODEL.deleteOne(WOD);
      //
      // Prepare response:
      // Get a list of all wods of the authorized user
      const USER_WODS = await WOD_MODEL.find({ user: request.user.id });
      // Get count
      const WODS_COUNT = await WOD_MODEL.find({
        user: request.user.id
      }).countDocuments();
      // Respond
      response.json({
        message: 'WOD deleted!',
        wods: { count: WODS_COUNT, posts: USER_WODS }
      });
      //
      //
    } /* if User not authorized */ else {
      response.status(404).json({ message: 'You should not be here' });
    }
    //
  } catch (error) {
    if (error.kind === 'ObjectId') {
      console.error(`\n${error.message}`);
      response.status(404).json({ message: 'No such WOD' });
    } else {
      console.error(error.message);
      response.status(500).send('Server Error');
    }
  }
};

module.exports = DELETE_WOD;
