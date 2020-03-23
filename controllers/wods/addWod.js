const WOD_MODEL = require('../../models/Wod');
const USER_MODEL = require('../../models/User');
/*
    @Route          POST api/wods
    @Description    Add a wod
    @Access         Private
*/
const ADD_WOD = async (request, response) => {
  // Attempt to create wod with request data and save to db
  try {
    //Who is Posting
    const USER = await USER_MODEL.findById(request.user.id);
    // Create Wod object
    const NEW_WOD = new WOD_MODEL({
      user: USER.id,
      name: USER.name,
      avatar: USER.avatar,
      wodName: request.body.wodName,
      warmUp: request.body.warmUp,
      tabata: request.body.tabata,
      fortime: request.body.fortime,
      emom: request.body.emom,
      amrap: request.body.amrap,
      coolDown: request.body.warmUp
    });

    // Save to db
    await NEW_WOD.save();
    // Created wod
    const WOD = await WOD_MODEL.find(NEW_WOD);
    // Respond to client
    response.json(WOD);
    //
    //
  } catch (error) {
    if (error.message.includes('E11000'))
      return response.status(400).json({ message: 'Name has to be unique' });
    console.error(error.message);
    response.status(500).send('Server Error');
  }
};

module.exports = ADD_WOD;
