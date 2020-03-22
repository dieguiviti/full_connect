const POST_MODEL = require('../../../models/Post');
const USER_MODEL = require('../../../models/User');
const { validationResult } = require('express-validator');

/*
    @Route          PUT api/posts/:id/comments
    @Description    Add comment to post
    @Access         Private
*/
const ADD_COMMENT = async (request, response) => {
  // Assert Validators
  const ERRORS = validationResult(request);
  if (!ERRORS.isEmpty())
    return response.status(404).json({ error: ERRORS.array() });
  // Attempt to find post and comment it
  try {
    // Target post and assert
    let targetPost = await POST_MODEL.findById(request.params.id);
    if (!targetPost)
      return response.status(400).json({ message: 'No such post' });
    // Find Commentator and assert
    const COMMENTATOR = await USER_MODEL.findById(request.user.id);
    if (!COMMENTATOR)
      return response.status(400).json({ message: 'Bad request' });
    // Create comment object
    const NEW_COMMENT = {
      user: COMMENTATOR.id,
      name: COMMENTATOR.name,
      avatar: COMMENTATOR.avatar,
      text: request.body.text
    };
    // Update comments array and save
    targetPost.comments.unshift(NEW_COMMENT);
    await targetPost.save();
    // Respond
    response.json(targetPost.comments);
    //
  } catch (error) {
    if (error.kind === 'ObjectId') {
      console.error(`\n${error.message}`.red.bold);
      response.status(404).json({ message: 'No such post' });
    } else {
      console.error(error.message);
      response.status(500).send('Server Error');
    }
  }
};
module.exports = ADD_COMMENT;
