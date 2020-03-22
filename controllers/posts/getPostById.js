const POST_MODEL = require('../../models/Post');

/*
    @Route          GET api/posts/:id
    @Description    GET single post
    @Access         Private
*/
const GET_POST_BY_ID = async (request, response) => {
  // Attemp to retrieve all posts from database
  try {
    // Assign post to variable and send to client
    const POST = await POST_MODEL.findById(request.params.id);
    if (!POST) {
      response.status(404).json({ message: 'No such Post' });
    } else {
      response.json(POST);
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

module.exports = GET_POST_BY_ID;
