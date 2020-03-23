const ROUTER = require('express').Router();
const AUTH = require('../../middleware/auth');
// Controllers
const ADD_WOD = require('../../controllers/wods/addWod');
const GET_ALL_WODS = require('../../controllers/wods/getAllWods');
const GET_MY_WODS = require('../../controllers/wods/getMyWods');
const GET_WOD_BY_ID = require('../../controllers/wods/getWodById');
const DELETE_WOD = require('../../controllers/wods/deleteWod');
const ADD_TABATA = require('../../controllers/wods/tabata/addTabata');
//
// Validators:
const { check } = require('express-validator');
//
// Tabata Validators
const TABATA_VALIDATORS = [
  check('movements', 'A movement is required')
    .not()
    .isEmpty()
];
// Emom Validators
const EMOM_VALIDATORS = [
  check('minutes', 'Minutes are required')
    .not()
    .isEmpty(),
  check('movement', 'A movement is required')
    .not()
    .isEmpty()
];
// ForTime Validators
const FOR_TIME_VALIDATORS = [
  check('timeCap', 'A timeCap is required')
    .not()
    .isEmpty(),
  check('movement', 'A movement is required')
    .not()
    .isEmpty()
];
// Amrap Validators
const AMRAP_VALIDATORS = [
  check('time', 'A time is required')
    .not()
    .isEmpty(),
  check('movement', 'A movement is required')
    .not()
    .isEmpty()
];
// Comment Validators
const COMMENT_VALIDATORS = [
  check('text', 'A text is required')
    .not()
    .isEmpty()
];

//
//
//              ||||||
// ROUTES BELOW V V V
//
//
//

/*
    @Route          POST api/wods
    @Description    Add a wod
    @Access         Private
*/
ROUTER.route('/').post(AUTH, ADD_WOD);

// /*
//     @Route          GET api/wods/me
//     @Description    Get all wods of the logged in user
//     @Access         Private
// */
ROUTER.route('/me').get(AUTH, GET_MY_WODS);

// /*
//     @Route          GET api/wods
//     @Description    Get all wods
//     @Access         Private
// */
ROUTER.route('/').get(AUTH, GET_ALL_WODS);

// /*
//     @Route          GET api/wods/:id
//     @Description    Get all wods
//     @Access         Private
// */
ROUTER.route('/:id').get(AUTH, GET_WOD_BY_ID);

// /*
//     @Route          DELETE api/wods/:id
//     @Description    Delete wod by id and authentication.
//     @Access         Private
// */
ROUTER.route('/:id').delete(AUTH, DELETE_WOD);

// /*
//     @Route          PUT api/wods/:id/tabata
//     @Description    Add tabata to wod.
//     @Access         Private
// */
ROUTER.route('/:id/tabata').put(AUTH, TABATA_VALIDATORS, ADD_TABATA);

// // /*
// //     @Route          PUT api/wods/:id/emom
// //     @Description    Add emom to wod.
// //     @Access         Private
// // */
// ROUTER.route('/:id/emom').put(AUTH, EMOM_VALIDATORS, ADD_EMOM);

// // /*
// //     @Route          PUT api/wods/:id/fortime
// //     @Description    Add fotime to wod.
// //     @Access         Private
// // */
// ROUTER.route('/:id/fortime').put(AUTH, FOR_TIME_VALIDATORS,  ADD_FORTIME);

// // /*
// //     @Route          PUT api/wods/:id/amrap
// //     @Description    Add amrap to wod.
// //     @Access         Private
// // */
// ROUTER.route('/:id/amrap').put(AUTH, AMRAP_VALIDATORS, ADD_AMRAP);

module.exports = ROUTER;
