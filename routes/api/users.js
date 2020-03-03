const ROUTER = require('express').Router();

/*
    @Route          GET api/users
    @Description    GET all users
    @Access         Public
*/
ROUTER.get('/', (request, response) => response.send('Users route'));

// Export ROUTER
module.exports = ROUTER;
