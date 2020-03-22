const POST_MODEL = require('../../../models/Post');
const USER_MODEL = require('../../../models/User');

/*
    @Route          PUT api/posts/:id/likes
    @Description    Add Liker to post
    @Access         Private
*/
const LIKE_POST = async (request, response) => {
  // Attempt to find the post and add a liker to likes array
  try {
    // Find post
    const TARGET_POST = await POST_MODEL.findById(request.params.id);
    if (!TARGET_POST)
      return response.status(404).json({ message: 'No such post' });
    // Who's liking it?
    const LIKER = await USER_MODEL.findById(request.user.id);
    // Check if user already liked picture
    if (!TARGET_POST.likes.every(like => like.user.toString() !== LIKER.id)) {
      return response
        .status(400)
        .json({ message: 'You have liked this post already' });
      //
      //
    } else {
      // Create like object
      const NEW_LIKE = {
        user: LIKER.id,
        name: LIKER.name,
        avatar: LIKER.avatar
      };
      // Add like to post
      TARGET_POST.likes.unshift(NEW_LIKE);
      // Save post
      await TARGET_POST.save();
      // Respond
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

module.exports = LIKE_POST;
