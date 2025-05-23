// dependencies...
const router = require("express").Router();
const {isAuthenticated} = require('../../Middlewares/authMiddleware');
const {
    commentController,
    replyPostController
} = require('../Controllers/commentController')
const {
    likesController,
    dislikesController
} = require('../Controllers/likeDislikeController');

const { getBookmarksController} = require('../Controllers/bookmarksController');



//comment routs
router.post('/comments/:postId', isAuthenticated , commentController);
router.post('/comments/reply/:commentId', isAuthenticated, replyPostController);

//like routes
router.get('/likes/:postId',isAuthenticated, likesController);
router.get('/dislikes/:postId', isAuthenticated, dislikesController);

//bookmark routes
router.get('/bookmarks/:postId', isAuthenticated, getBookmarksController);

module.exports = router;