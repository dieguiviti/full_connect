const ROUTER = require('express').Router();
const AUTH = require('../../middleware/auth');
// Controllers
const GET_ALL_POSTS = require('../../controllers/posts/getAllPosts');
const GET_MY_POSTS = require('../../controllers/posts/getMyPosts');
const GET_POST_BY_ID = require('../../controllers/posts/getPostById');
const DELETE_POST = require('../../controllers/posts/deletePost');
const ADD_POST = require('../../controllers/posts/addPost');
const LIKE_POST = require('../../controllers/posts/likes/likePost');
const UNLIKE_POST = require('../../controllers/posts/likes/unlikePost');
const GET_LIKES = require('../../controllers/posts/likes/getLikes');
const ADD_COMMENT = require('../../controllers/posts/comments/addComment');
const DELETE_COMMENT = require('../../controllers/posts/comments/deleteComment');
const GET_COMMENTS = require('../../controllers/posts/comments/getComments');
const GET_COMMENT_LIKES = require('../../controllers/posts/comments/likes/getCommentLikes');
const LIKE_COMMENT = require('../../controllers/posts/comments/likes/likeComment');
const UNLIKE_COMMENT = require('../../controllers/posts/comments/likes/unlikeComment');
// Validation
const { check } = require('express-validator');
//
//
// VALIDATORS:
// Post Validators
const POST_VALIDATORS = [
  check('text', 'A text is required')
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
    @Route          GET api/posts
    @Description    GET all posts
    @Access         Private
*/
ROUTER.route('/').get(AUTH, GET_ALL_POSTS);

/*
    @Route          GET api/posts/me
    @Description    GET all owned posts
    @Access         Private
*/
ROUTER.route('/me').get(AUTH, GET_MY_POSTS);

/*
    @Route          GET api/posts/:id
    @Description    GET single post
    @Access         Private
*/
ROUTER.route('/:id').get(AUTH, GET_POST_BY_ID);

/*
    @Route          DELETE api/posts/:id
    @Description    DELETE single post
    @Access         Private
*/
ROUTER.route('/:id').delete(AUTH, DELETE_POST);

/*
    @Route          POST api/posts
    @Description    Add a post
    @Access         Private
*/
ROUTER.route('/').post(AUTH, POST_VALIDATORS, ADD_POST);

/*
    @Route          GET api/posts/:id/likes
    @Description    Get Likes of post
    @Access         Private
*/
ROUTER.route('/:id/likes').get(AUTH, GET_LIKES);

/*
    @Route          PUT api/posts/:id/likes
    @Description    Add Liker to post
    @Access         Private
*/
ROUTER.route('/:id/likes').put(AUTH, LIKE_POST);

/*
    @Route          PUT api/posts/:id/unlike
    @Description    Add Liker to post
    @Access         Private
*/
ROUTER.route('/:id/unlike/').put(AUTH, UNLIKE_POST);

/*
    @Route          GET api/posts/:id/comments
    @Description    GET comments of post
    @Access         Private
*/
ROUTER.route('/:id/comments').get(AUTH, GET_COMMENTS);

/*
    @Route          PUT api/posts/:id/comments
    @Description    Add comment to post
    @Access         Private
*/
ROUTER.route('/:id/comments').put(AUTH, COMMENT_VALIDATORS, ADD_COMMENT);

/*
    @Route          PUT api/posts/:id/comments/:comment_id
    @Description    Remove comment from post
    @Access         Private
*/
ROUTER.route('/:id/comments/:comment_id').put(AUTH, DELETE_COMMENT);

/*
    @Route          GET api/posts/:id/comments/:comment_id/likes
    @Description    GET comment likes
    @Access         Private
*/
ROUTER.route('/:id/comments/:comment_id/likes').get(AUTH, GET_COMMENT_LIKES);

/*
    @Route          PUT api/posts/:id/comments/:comment_id/likes
    @Description    Like a comment
    @Access         Private
*/
ROUTER.route('/:id/comments/:comment_id/likes').put(AUTH, LIKE_COMMENT);

/*
    @Route          PUT api/posts/:id/comments/:comment_id/unlike
    @Description    Like a comment
    @Access         Private
*/
ROUTER.route('/:id/comments/:comment_id/unlike').put(AUTH, UNLIKE_COMMENT);

// Export ROUTER
module.exports = ROUTER;
