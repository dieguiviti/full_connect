const USER_MODEL = require('../../../models/User');
const POST_MODEL = require('../../../models/Post');

/*
    @Route          PUT api/posts/:id/unlike
    @Description    Add Liker to post
    @Access         Private
*/
const UNLIKE_POST = async (request, response) => {
  // Attempt to find the post and add a liker to likes array
  try {
    // Find post and assert
    let targetPost = await POST_MODEL.findById(request.params.id);
    if (!targetPost)
      return response.status(404).json({ message: 'No such post' });
    //
    // Who is unliking the post?
    const UNLIKER = await USER_MODEL.findById(request.user.id).select(
      '-password'
    );
    // Validate UNLIKER
    if (!UNLIKER) return response.status(400).json({ message: 'Bad request' });
    // Create updated likes array
    const UPDATED_LIKES = targetPost.likes.filter(
      like => like.user.toString() !== UNLIKER._id.toString()
    );
    // Check if user liked picture in order to unlike
    if (UPDATED_LIKES.length === targetPost.likes.length) {
      return response
        .status(400)
        .json({ message: 'You have not liked this picture' });
    } else {
      // Update target post
      targetPost.likes = UPDATED_LIKES;
      await targetPost.save();
      // Respond to client
      response.json(targetPost.likes);
    }
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

module.exports = UNLIKE_POST;
