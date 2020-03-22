const POST_MODEL = require('../../models/Post');

/*
    @Route          GET api/posts
    @Description    GET all posts
    @Access         Private
*/
const GET_ALL_POSTS = async (request, response) => {
  // Attemp to retrieve all posts from database
  try {
    // Assign posts to variable
    const POSTS = await POST_MODEL.find().sort({ date: -1 });
    // respond to client with posts
    response.json(POSTS);
    //
  } catch (error) {
    console.error(`${error.message}`);
    response.status(500).send('Server Error');
  }
};

module.exports = GET_ALL_POSTS;
