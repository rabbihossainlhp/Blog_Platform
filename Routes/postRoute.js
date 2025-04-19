const router = require("express").Router();
const {
    createPostGetController, 
    createPostPosttController,
    editPostGetController,
    editPostPostController,
    getDeletePostController
} = require('../Controller/postController.js');
const {isAuthenticated} = require("../Middlewares/authMiddleware");
const  upload = require("../Middlewares/uploadMiddlware");


router.get('/create',isAuthenticated, createPostGetController);
router.post('/create', isAuthenticated, upload.single("image"),  createPostPosttController);

router.get('/edit/:id', isAuthenticated, editPostGetController);
router.post('/edit/:id', isAuthenticated, upload.single("image"), editPostPostController);

router.get('/delete/:id', isAuthenticated,getDeletePostController);

module.exports = router;    