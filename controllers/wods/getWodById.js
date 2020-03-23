const WOD_MODEL = require('../../models/Wod');

/*
    @Route          GET api/wods/:id
    @Description    GET single wod
    @Access         Private
*/
const GET_WOD_BY_ID = async (request, response) => {
  // Attemp to retrieve a single wod from database
  try {
    // Assign post to variable and send to client
    const WOD = await WOD_MODEL.findById(request.params.id);
    if (!WOD) {
      response.status(404).json({ message: 'No such WOD' });
    } else {
      response.json(WOD);
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

module.exports = GET_WOD_BY_ID;
