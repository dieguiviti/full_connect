const ROUTER = require('express').Router();

/*
    @Route          GET api/posts
    @Description    GET all posts
    @Access         Public
*/
ROUTER.get('/', (request, response) => response.send('Posts route'));

// Export ROUTER
module.exports = ROUTER;
