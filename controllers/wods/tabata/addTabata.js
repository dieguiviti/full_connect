const WOD_MODEL = require('../../../models/Wod');
const { validationResult } = require('express-validator');

/*
    @Route          PUT api/wods/:id/tabata
    @Description    add trainer credentials
    @Access         Private
*/
const ADD_TABATA = async (request, response) => {
  const ERRORS = validationResult(request);
  // Any errors?
  if (!ERRORS.isEmpty) {
    return response.status(400).json({ errors: ERRORS.array() });
  }
  // No errors? Assign props
  const { movements } = request.body;
  // Create new credential object
  const NEW_TABATA = {};
  NEW_TABATA.movements = movements
    .split(',')
    .map(move => move.trim().toUpperCase());
  // Attempt to find wod in db and assign new tabata
  try {
    const TARGET_WOD = await WOD_MODEL.findOne({
      _id: request.params.id
    });
    TARGET_WOD.tabata.unshift(NEW_TABATA);
    // save to db
    TARGET_WOD.save();
    // Respond to client
    response.json(TARGET_WOD);
    //
  } catch (error) {
    console.error(error.message);
    response
      .status(500)
      .send('Server Error, please refer to someone in charge');
  }
};

module.exports = ADD_TABATA;
