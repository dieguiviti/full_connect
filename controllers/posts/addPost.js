const POST_MODEL = require('../../models/Post');
const USER_MODEL = require('../../models/User');
const { validationResult } = require('express-validator');

/*
    @Route          POST api/posts
    @Description    Add a post
    @Access         Private
*/
const ADD_POST = async (request, response) => {
  // Check for validation errors
  const ERRORS = validationResult(request);
  if (!ERRORS.isEmpty())
    return response.status(400).json({ errors: ERRORS.array() });
  // Attemp to create a post with request data and save to db
  try {
    // Who is posting?
    let user = await USER_MODEL.findById(request.user.id).select('-password');
    // Create Post object
    const NEW_POST = new POST_MODEL({
      user: request.user.id,
      text: request.body.text,
      name: user.name,
      avatar: user.avatar
    });
    // Save post to db
    await NEW_POST.save();
    // User's posts
    const USER_POSTS = await POST_MODEL.find({ user: request.user.id });
    // Respond to client
    response.json(USER_POSTS);
    //
  } catch (error) {
    console.error(`${error.message}`.red.bold);
    response.status(500).send('Server Error');
  }
};

module.exports = ADD_POST;
