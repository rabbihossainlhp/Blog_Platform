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
router.post('/commnets/:postId', isAuthenticated , commentController);
router.post('/comments/reply/:commentId', isAuthenticated, replyPostController);

//like routes
router.post('/likes/:postId',isAuthenticated, likesController);
router.post('/dislikes/:postId', isAuthenticated, dislikesController);

//bookmark routes
router.get('/bookmarks/:postId', isAuthenticated, getBookmarksController);

module.exports = router;