const router = require("express").Router();
const {
    createPostGetController, 
    createPostPosttController,
} = require('../Controller/postController.js');
const {isAuthenticated} = require("../Middlewares/authMiddleware");
const  upload = require("../Middlewares/uploadMiddlware");


router.get('/create',isAuthenticated, createPostGetController);
router.post('/create', isAuthenticated, upload.single("image"),  createPostPosttController);


module.exports = router;