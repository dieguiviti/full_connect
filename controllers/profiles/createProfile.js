const PROFILE_MODEL = require('../../models/Profile');
const { validationResult } = require('express-validator');

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
  return box.toUpperCase();
};

/*
    @Route          POST api/profiles/
    @Description    Create or update user profile
    @Access         Private
*/
const CREATE_PROFILE = async (request, response) => {
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
};

module.exports = CREATE_PROFILE;
