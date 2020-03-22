const POST_MODEL = require('../../../models/Post');

/*
    @Route          PUT api/posts/:id/comments/:comment_id
    @Description    Remove comment from post
    @Access         Private
*/
const DELETE_COMMENT = async (request, response) => {
  // Attempt to find the post and uncomment
  try {
    // Target post and assert
    let targetPost = await POST_MODEL.findById(request.params.id);
    if (!targetPost)
      return response.status(400).json({ message: 'No such post' });
    // Target comment
    let comment_to_delete = await targetPost.comments.find(
      comment => comment.id.toString() === request.params.comment_id
    );
    if (!comment_to_delete)
      return response.status(404).json({ message: 'No such comment' });
    // create updated comments array
    // Check if the deleter is either the post owner or the comment creator
    if (
      comment_to_delete.user.toString() === request.user.id ||
      request.user.id === targetPost.user.toString()
    ) {
      const UPDATED_COMMENTS = targetPost.comments.filter(
        comment => comment.id.toString() !== comment_to_delete.id
      );
      targetPost.comments = UPDATED_COMMENTS;
      await targetPost.save();
      // Respond
      return response.json(targetPost.comments);
      //
    } else {
      return response
        .status(401)
        .json({ message: 'You cannot delete this comment' });
    }
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

module.exports = DELETE_COMMENT;
