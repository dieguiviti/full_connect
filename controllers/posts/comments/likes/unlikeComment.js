const USER_MODEL = require('../../../../models/User');
const POST_MODEL = require('../../../../models/Post');

/*
    @Route          PUT api/posts/:id/comments/:comment_id/unlike
    @Description    Like a comment
    @Access         Private
*/
const UNLIKE_COMMENT = async (request, response) => {
  // Attempt to find the comment and add a liker to likes array
  try {
    // Find post and assert
    let targetPost = await POST_MODEL.findById(request.params.id);
    if (!targetPost)
      return response.status(404).json({ message: 'No such post' });
    // Find comment
    let targetComment = await targetPost.comments.find(
      comment => comment.id.toString() === request.params.comment_id
    );
    // Who is unliking the comment?
    const UNLIKER = await USER_MODEL.findById(request.user.id);
    // Validate UNLIKER
    if (!UNLIKER) return response.status(400).json({ message: 'Bad request' });
    // Create updated likes array
    const UPDATED_LIKES = targetComment.likes.filter(
      like => like.user.toString() !== UNLIKER._id.toString()
    );
    // Check if user liked comment in order to unlike
    if (UPDATED_LIKES.length === targetPost.likes.length) {
      return response
        .status(400)
        .json({ message: 'You have not liked this comment' });
    } else {
      // Update target comment
      targetComment.likes = UPDATED_LIKES;
      await targetPost.save();
      // Respond to client
      response.json(targetComment);
    }
    //
  } catch (error) {
    if (error.kind === 'ObjectId') {
      console.error(`\n${error.message}`);
      response.status(404).json({ message: 'No such comment' });
    } else {
      console.error(error.message);
      response.status(500).send('Server Error');
    }
  }
};

module.exports = UNLIKE_COMMENT;
