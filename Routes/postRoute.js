const router = require("express").Router();
const {
    createPostGetController, 
    createPostPosttController,
} = require('../Controller/postController.js');
const {isAuthenticated} = require("../Middlewares/authMiddleware");



router.get('/create',isAuthenticated, createPostGetController);
router.post('/create', isAuthenticated, createPostPosttController);


module.exports = router;