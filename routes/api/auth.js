const ROUTER = require('express').Router();

/*
    @Route          GET api/auth
    @Description    test route
    @Access         Public
*/
ROUTER.get('/', (request, response) => response.send('Auth route'));

// Export ROUTER
module.exports = ROUTER;
