const POST_MODEL = require('../../models/Post');

/*
    @Route          DELETE api/posts/:id
    @Description    DELETE single post
    @Access         Private
*/
const DELETE_POST = async (request, response) => {
  // Attemp to retrieve all posts from database
  try {
    // Assign post to variable
    const POST = await POST_MODEL.findById(request.params.id);
    // Assert post existence and respond
    if (!POST) {
      response.status(404).json({ message: 'No such Post' });
      //
    } else if (POST.user.toString() === request.user.id) {
      // Remove post
      await POST_MODEL.deleteOne(POST);
      //
      // Prepare response:
      // Get a list of all posts of the authorized user
      const USER_POSTS = await POST_MODEL.find({ user: request.user.id });
      // Get count
      const POSTS_COUNT = await POST_MODEL.find({
        user: request.user.id
      }).countDocuments();
      // Respond
      response.json({
        message: 'Post deleted!',
        posts: { count: POSTS_COUNT, posts: USER_POSTS }
      });
      //
      //
    } /* if User not authorized */ else {
      response.status(404).json({ message: 'You should not be here' });
    }
    //
  } catch (error) {
    if (error.kind === 'ObjectId') {
      console.error(`\n${error.message}`);
      response.status(404).json({ message: 'No such post' });
    } else {
      console.error(error.message);
      response.status(500).send('Server Error');
    }
  }
};

module.exports = DELETE_POST;
