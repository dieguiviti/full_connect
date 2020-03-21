const ROUTER = require('express').Router();
const AUTH = require('../../middleware/auth');
// Controllers
const GET_PROFILES = require('../../controllers/profiles/getProfiles');
const GET_USER_PROFILE = require('../../controllers/profiles/getUserProfile');
const CREATE_PROFILE = require('../../controllers/profiles/createProfile');
const GET_MY_PROFILE = require('../../controllers/profiles/getMyProfile');
const DELETE_MY_PROFILE = require('../../controllers/profiles/deleteMyProfile');
const GET_MY_CREDENTIALS = require('../../controllers/profiles/credentials/getMyCredentials');
const ADD_CREDENTIAL = require('../../controllers/profiles/credentials/addCredential');
const DELETE_CREDENTIAL = require('../../controllers/profiles/credentials/deleteCredential');
const GET_MY_COMPETITIONS = require('../../controllers/profiles/competitions/getMyCompetitions');
const ADD_COMPETITION = require('../../controllers/profiles/competitions/addCompetition');
const DELETE_COMPETITION = require('../../controllers/profiles/competitions/deleteCompetition');
const GET_MY_PERSONAL_RECORDS = require('../../controllers/profiles/records/personalRecords/getMyPersonalRecords');
const ADD_PERSONAL_RECORD = require('../../controllers/profiles/records/personalRecords/addPersonalRecord');
const DELETE_PERSONAL_RECORD = require('../../controllers/profiles/records/personalRecords/deletePersonalRecord');
const GET_MY_MAX_REPETITIONS = require('../../controllers/profiles/records/maxRepetitions/getMyMaxRepetitions');
const ADD_MAX_REPETITIONS = require('../../controllers/profiles/records/maxRepetitions/addMaxRepetition');
const DELETE_MAX_REPETITIONS = require('../../controllers/profiles/records/maxRepetitions/deleteMaxRepetition');

// Express validator
const { check } = require('express-validator');
//
// VALIDATORS:
//
// Profile Validators
const PROFILE_VALIDATORS = [
  check('box', 'A box is required')
    .not()
    .isEmpty(),
  check('division', 'Division is required')
    .not()
    .isEmpty(),
  check('favoriteMoves', 'Favorite moves are required')
    .not()
    .isEmpty(),
  check('strength', 'Strength is required')
    .not()
    .isEmpty(),
  check('weakness', 'Weakness is required')
    .not()
    .isEmpty()
];

// trainer credential data validation
const CREDENTIAL_VALIDATORS = [
  check('credential', 'Credential is required')
    .not()
    .isEmpty(),
  check('issuer', 'An issuer is required')
    .not()
    .isEmpty(),
  check('issueDate', 'An issue date is required')
    .not()
    .isEmpty()
];
// Competition data validation
const COMPETITION_VALIDATORS = [
  check('competitionName', 'A competition name is required')
    .not()
    .isEmpty(),
  check('location', 'A location is required')
    .not()
    .isEmpty(),
  check('finishDate', 'A finish date is required')
    .not()
    .isEmpty()
];
// Personal Record data validation
const PR_VALIDATORS = [
  check('movement', 'A movement is required')
    .not()
    .isEmpty(),
  check('weight', 'A weight must be specified')
    .not()
    .isEmpty()
];
// Max Repetitions data validation
const MR_VALIDATORS = [
  check('movement', 'A movement is required')
    .not()
    .isEmpty(),
  check('reps', 'A weight must be specified')
    .not()
    .isEmpty()
];

//
//
//
//  ROUTE REQUESTS BELOW
//
//
//
/*
    @Route          GET api/profiles
    @Description    list all profiles
    @Access         Public
*/
ROUTER.route('/').get(GET_PROFILES);

/*
    @Route          GET api/profiles/:id
    @Description    Get profile by user id
    @Access         Public
*/
ROUTER.route('/:id').get(GET_USER_PROFILE);

/*
    @Route          POST api/profiles/
    @Description    Create or update user profile
    @Access         Private
*/
ROUTER.route('/').post(AUTH, PROFILE_VALIDATORS, CREATE_PROFILE);

/*
    @Route          GET api/profile/me
    @Description    GET current user's profile
    @Access         Private
*/
ROUTER.route('/me').get(AUTH, GET_MY_PROFILE);

/*
    @Route          DELETE api/profile/me
    @Description    DELETE current user's profile, account and posts
    @Access         Private
*/
ROUTER.route('/me').delete(AUTH, DELETE_MY_PROFILE);

/*
    @Route          GET api/profiles/me/credentials
    @Description    Get all trainer credentials
    @Access         Private
*/
ROUTER.route('/me/credentials').get(AUTH, GET_MY_CREDENTIALS);

/*
    @Route          PUT api/profiles/me/credentials
    @Description    add trainer credentials
    @Access         Private
*/
ROUTER.route('/me/credentials').put(
  AUTH,
  CREDENTIAL_VALIDATORS,
  ADD_CREDENTIAL
);

/*
    @Route          DELETE api/profiles/me/credentials/:id
    @Description    delete credential from profile
    @Access         Private
*/
ROUTER.route('/me/credentials/:id').delete(AUTH, DELETE_CREDENTIAL);

/*
    @Route          GET api/profiles/me/competitions
    @Description    Get all competitions
    @Access         Private
*/
ROUTER.route('/me/competitions').get(AUTH, GET_MY_COMPETITIONS);

/*
    @Route          PUT api/profiles/me/competitions
    @Description    add competition to profile
    @Access         Private
*/
ROUTER.route('/me/competitions').put(
  AUTH,
  COMPETITION_VALIDATORS,
  ADD_COMPETITION
);

/*
    @Route          DELETE api/profiles/me/competitions/:id
    @Description    delete competition from profile
    @Access         Private
*/
ROUTER.route('/me/competitions/:id').delete(AUTH, DELETE_COMPETITION);

/*
    @Route          GET api/profiles/me/personalrecords
    @Description    Get all personalrecords
    @Access         Private
*/
ROUTER.route('/me/personalrecords').get(AUTH, GET_MY_PERSONAL_RECORDS);

/*
    @Route          PUT api/profiles/me/personalrecords
    @Description    add personal record to profile
    @Access         Private
*/
ROUTER.route('/me/personalrecords').put(
  AUTH,
  PR_VALIDATORS,
  ADD_PERSONAL_RECORD
);

/*
    @Route          DELETE api/profiles/me/personalrecords/:id
    @Description    delete competition from profile
    @Access         Private
*/
ROUTER.route('/me/personalrecords/:id').delete(AUTH, DELETE_PERSONAL_RECORD);

/*
    @Route          GET api/profiles/me/maxrepetitions
    @Description    Get all maxrepetitions
    @Access         Private
*/
ROUTER.route('/me/maxrepetitions').get(AUTH, GET_MY_MAX_REPETITIONS);

/*
    @Route          PUT api/profiles/me/maxrepetitions
    @Description    add max repetition to profile
    @Access         Private
*/
ROUTER.route('/me/maxrepetitions').put(
  AUTH,
  MR_VALIDATORS,
  ADD_MAX_REPETITIONS
);

/*
    @Route          DELETE api/profiles/me/maxrepetitions/:id
    @Description    delete maxrepetition from profile
    @Access         Private
*/
ROUTER.route('/me/maxrepetitions/:id').delete(AUTH, DELETE_MAX_REPETITIONS);

// Export Router
module.exports = ROUTER;
