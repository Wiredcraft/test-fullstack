var express = require('express');
var postRoutes = express.Router();

const PostsController = require('../controllers/posts');

postRoutes.route('/fetch').get(PostsController.getPosts);

postRoutes.route('/add').post(PostsController.addPost);

postRoutes.route('/like/:postId').post(PostsController.likePost);

module.exports = postRoutes;