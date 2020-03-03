const ROUTER = require('express').Router();

/*
    @Route          GET api/profiles
    @Description    GET all profiles
    @Access         Public
*/
ROUTER.get('/', (request, response) => response.send('Profiles route'));

// Export ROUTER
module.exports = ROUTER;
