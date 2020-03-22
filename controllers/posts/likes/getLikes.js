const POST_MODEL = require('../../../models/Post');

/*
    @Route          GET api/posts/:id/likes
    @Description    Get Likes of post
    @Access         Private
*/
const GET_LIKES = async (request, response) => {
  // Attempt to find post and retrieve likes
  try {
    // Target Post and assert
    const TARGET_POST = await POST_MODEL.findById(request.params.id);
    if (!TARGET_POST)
      return response.status(404).json({ message: 'No such post' });
    // Assert likes and invite to if empty
    if (TARGET_POST.likes.length === 0) {
      return response.json({
        message: 'No likes here, be the first one to add one'
      });
    } else {
      // Respond to client
      response.json(TARGET_POST.likes);
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

module.exports = GET_LIKES;
