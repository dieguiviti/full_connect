const WOD_MODEL = require('../../models/Wod');

/*
    @Route          GET api/wods
    @Description    GET all wods
    @Access         Private
*/
const GET_ALL_WODS = async (request, response) => {
  // Attemp to retrieve all wods from database
  try {
    // Assign wods to variable
    const WODS = await WOD_MODEL.find().sort({ date: -1 });
    // respond to client with wods
    response.json(WODS);
    //
  } catch (error) {
    console.error(`${error.message}`);
    response.status(500).send('Server Error');
  }
};

module.exports = GET_ALL_WODS;
