const POST_MODEL = require('../../../models/Post');

/*
    @Route          GET api/posts/:id/comments
    @Description    GET comments of post
    @Access         Private
*/
const GET_COMMENTS = async (request, response) => {
  // Attempt to find comments and send
  try {
    // Target post and assert
    let targetPost = await POST_MODEL.findById(request.params.id);
    if (!targetPost)
      return response.status(404).json({ message: 'No such post' });
    // Assert comments and invite to if empty
    if (targetPost.comments.length === 0) {
      return response.json({
        message: 'No comments here, be the first one to add one'
      });
    } else {
      // Respond to client
      response.json(targetPost.comments);
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

module.exports = GET_COMMENTS;
