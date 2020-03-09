const ROUTER = require('express').Router();
const AUTH = require('../../middleware/auth');
const PROFILE_MODEL = require('../../models/Profile');
const USER_MODEL = require('../../models/User');
const { check, validationResult } = require('express-validator');

// User profile creation required data Validation
const PROFILE_VALIDATORS = [
  check('box', 'A box is required')
    .not()
    .isEmpty(),
  check('division', 'Division is required')
    .not()
    .isEmpty(),
  check('favoriteMoves', 'Favorite moves are required')
    .not()
    .isEmpty(),
  check('strength', 'Strength is required')
    .not()
    .isEmpty(),
  check('weakness', 'Weakness is required')
    .not()
    .isEmpty()
];
// trainer credential data validation
const CREDENTIAL_VALIDATORS = [
  check('credential', 'Credential is required')
    .not()
    .isEmpty(),
  check('issuer', 'An issuer is required')
    .not()
    .isEmpty(),
  check('issueDate', 'An issue date is required')
    .not()
    .isEmpty()
];
// Competition data validation
const COMPETITION_VALIDATORS = [
  check('competitionName', 'A competition name is required')
    .not()
    .isEmpty(),
  check('location', 'A location is required')
    .not()
    .isEmpty(),
  check('finishDate', 'A finish date is required')
    .not()
    .isEmpty()
];
// Personal Record data validation
const PR_VALIDATORS = [
  check('movement', 'A movement is required')
    .not()
    .isEmpty(),
  check('weight', 'A weight must be specified')
    .not()
    .isEmpty()
];
// Max Repetitions data validation
const MR_VALIDATORS = [
  check('movement', 'A movement is required')
    .not()
    .isEmpty(),
  check('reps', 'A weight must be specified')
    .not()
    .isEmpty()
];
// User profile props formatter methods
const STRENGTH_FORMATTED = strength => {
  return strength.toLowerCase().replace(strength[0], strength[0].toUpperCase());
};
const WEAKNESS_FORMATTED = weakness => {
  return weakness.toLowerCase().replace(weakness[0], weakness[0].toUpperCase());
};
const DIVISION_FORMATTED = division => {
  return division.toLowerCase().replace(division[0], division[0].toUpperCase());
};
const LOCATION_FORMATTED = location => {
  return location.toLowerCase().replace(location[0], location[0].toUpperCase());
};
const BOX_FORMATTED = box => {
  return box
    .split(' ')
    .map(word => word.toLowerCase().replace(word[0], word[0].toUpperCase()))
    .join(' ');
};
//
//
//
//  ROUTE REQUESTS BELOW
//
//
//

/*
    @Route          POST api/profile/
    @Description    Create or update user profile
    @Access         Private
*/
ROUTER.post('/', [AUTH, PROFILE_VALIDATORS], async (request, response) => {
  const ERRORS = validationResult(request);
  // Check for errors in request
  if (!ERRORS.isEmpty()) {
    return response.status(400).json({ errors: ERRORS.array() });
  }

  // Profile properties from request body
  const {
    bio,
    box,
    location,
    website,
    division,
    favoriteMoves,
    strength,
    weakness,
    facebook,
    twitter,
    instagram
  } = request.body;

  // Build the actual profile object
  const PROFILE_OBJECT = {};
  // Set profile user equal to the id sent with the token that is decoded with the AUTH middleware
  PROFILE_OBJECT.user = request.user.id;
  // Check if other props were sent and assign
  if (bio) PROFILE_OBJECT.bio = bio;
  if (box) PROFILE_OBJECT.box = BOX_FORMATTED(box);
  if (website) PROFILE_OBJECT.website = website.toLowerCase();
  if (location) PROFILE_OBJECT.location = LOCATION_FORMATTED(location);
  if (division) PROFILE_OBJECT.division = DIVISION_FORMATTED(division);
  if (strength) PROFILE_OBJECT.strength = STRENGTH_FORMATTED(strength);
  if (weakness) PROFILE_OBJECT.weakness = WEAKNESS_FORMATTED(weakness);
  // turn favoriteMoves to array and assign to profile object
  PROFILE_OBJECT.favoriteMoves = favoriteMoves
    .split(',')
    .map(move => move.trim().toUpperCase());
  // Create Social media object of PROFILE_OBJECT
  PROFILE_OBJECT.socialMedia = {};
  if (facebook) PROFILE_OBJECT.socialMedia.facebook = facebook;
  if (twitter)
    PROFILE_OBJECT.socialMedia.twitter = `https://twitter.com/${twitter}`;
  if (instagram)
    PROFILE_OBJECT.socialMedia.instagram = `https://instagram.com/${instagram}`;

  // Attemp to find & save profile to db and send response to client
  try {
    let profile = await PROFILE_MODEL.findOne({ user: request.user.id });

    // Update
    if (profile) {
      profile = await PROFILE_MODEL.findOneAndUpdate(
        { user: request.user.id },
        { $set: PROFILE_OBJECT },
        { new: true }
      );
      return response.json(profile);
    }
    // Create
    profile = new PROFILE_MODEL(PROFILE_OBJECT);
    await profile.save();
    // Respond to client
    return response.json(profile);

    //
  } catch (error) {
    console.error(error.message);
    return response.status(500).send(error + 'Server Error');
  }
});

/*
    @Route          GET api/profile/me
    @Description    GET current user's profile
    @Access         Private
*/
ROUTER.get('/me', AUTH, async (request, response) => {
  try {
    // find and set Profile to the request.user.id's corresponding profile
    const PROFILE = await PROFILE_MODEL.findOne({
      user: request.user.id
    }).populate('user', ['name', 'avatar']); // Populate the user prop with name and avatar

    // No profile? Send code 400
    if (!PROFILE)
      return response
        .status(400)
        .json({ message: 'No profile yet, create one' });

    // All good, send profile to client
    response.json(PROFILE);
  } catch (error) {
    console.log(error.message);
    response.status(500).send('Server Error');
  }
});

/*
    @Route          DELETE api/profile/me
    @Description    DELETE current user's profile, account and posts
    @Access         Private
*/
ROUTER.delete('/me', AUTH, async (request, response) => {
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
});

/*
    @Route          PUT api/profiles/me/credentials
    @Description    add trainer credentials
    @Access         Private
*/
ROUTER.put(
  '/me/credentials/',
  [AUTH, CREDENTIAL_VALIDATORS],
  async (request, response) => {
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
  }
);

/*
    @Route          PUT api/profiles/me/competitions
    @Description    add competition to profile
    @Access         Private
*/
ROUTER.put(
  '/me/competitions/',
  [AUTH, COMPETITION_VALIDATORS],
  async (request, response) => {
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
  }
);

/*
    @Route          PUT api/profiles/me/personalrecords
    @Description    add personal record to profile
    @Access         Private
*/
ROUTER.put(
  '/me/personalrecords/',
  [AUTH, PR_VALIDATORS],
  async (request, response) => {
    const ERRORS = validationResult(request);
    // Any errors?
    if (!ERRORS.isEmpty) {
      return response.status(400).json({ errors: ERRORS.array() });
    }
    // No errors? Assign props
    const { movement, weight } = request.body;
    // Create new credential object
    const NEW_PR = {
      movement,
      weight
    };
    // Attempt to find profile in db and assign new credential
    try {
      const TARGET_PROFILE = await PROFILE_MODEL.findOne({
        user: request.user.id
      });
      TARGET_PROFILE.personalRecords.unshift(NEW_PR);
      // save to db
      TARGET_PROFILE.save();
      // Respond to client
      response.json(TARGET_PROFILE.personalRecords);
      //
    } catch (error) {
      console.error(error.message);
      response
        .status(500)
        .send('Server Error, please refer to someone in charge');
    }
  }
);

/*
    @Route          PUT api/profiles/me/maxrepetitions
    @Description    add max repetition to profile
    @Access         Private
*/
ROUTER.put(
  '/me/maxrepetitions/',
  [AUTH, MR_VALIDATORS],
  async (request, response) => {
    const ERRORS = validationResult(request);
    // Any errors?
    if (!ERRORS.isEmpty) {
      return response.status(400).json({ errors: ERRORS.array() });
    }
    // No errors? Assign props
    const { movement, reps } = request.body;
    // Create new credential object
    const NEW_MR = {
      movement,
      reps
    };
    // Attempt to find profile in db and assign new credential
    try {
      const TARGET_PROFILE = await PROFILE_MODEL.findOne({
        user: request.user.id
      });
      TARGET_PROFILE.maxRepetitions.unshift(NEW_MR);
      // save to db
      TARGET_PROFILE.save();
      // Respond to client
      response.json(TARGET_PROFILE.maxRepetitions);
      //
    } catch (error) {
      console.error(error.message);
      response
        .status(500)
        .send('Server Error, please refer to someone in charge');
    }
  }
);

/*
    @Route          GET api/profiles
    @Description    list all profiles
    @Access         Public
*/
ROUTER.get('/', async (request, response) => {
  try {
    // Grab profiles
    const PROFILES = await PROFILE_MODEL.find().populate('user', [
      'name',
      'avatar'
    ]);
    // Respond to client
    response.json(PROFILES);
  } catch (error) {
    console.error(error.message);
    response.status(500).send('Server Error');
  }
});

/*
    @Route          GET api/profiles/:id
    @Description    Get profile by user id
    @Access         Public
*/
ROUTER.get('/:id', async (request, response) => {
  try {
    // Initialize a variable containing the routed profile
    const PROFILE = await PROFILE_MODEL.findOne({
      user: request.params.id
    }).populate('user', ['name', 'avatar']);

    // Check if there is a profile for user
    if (!PROFILE)
      return response
        .status(500)
        .json({ message: 'There is no profile for this user' });

    // respond to client
    response.json(PROFILE);
    //
  } catch (error) {
    console.error(error.message);
    // Avoid mistaken server errors
    if (error.kind == 'ObjectId') {
      return response.status(400).json({ message: 'Profile not found' });
    } else {
      response.status(500).send('Server Error');
    }
  }
});

// Export Router
module.exports = ROUTER;
