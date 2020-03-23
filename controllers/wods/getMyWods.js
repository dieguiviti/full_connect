const WOD_MODEL = require('../../models/Wod');

/*
    @Route          GET api/wods/me
    @Description    GET all owned wods
    @Access         Private
*/
const GET_MY_WODS = async (request, response) => {
  // Attemp to retrieve all wods from database
  try {
    // Assign wods to variable
    const WODS = await WOD_MODEL.find({ user: request.user.id }).sort({
      date: -1
    });
    // respond to client with posts
    response.json(WODS);
    //
  } catch (error) {
    console.error(error, `${error.message}`);
    response.status(500).send('Server Error');
  }
};

module.exports = GET_MY_WODS;
