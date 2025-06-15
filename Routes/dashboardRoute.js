//dependencies....
const router = require("express").Router();
const {isAuthenticated} = require("../Middlewares/authMiddleware");
const {
    dashboardGetController,
    createProfileGetController,
    createProfilePostController,
    editProfileGetController,
    editProfilePostController,
    getBookmarksController,
    getCommentsController,
} = require("../Controller/dashboardController");

const profileValidation = require('../Vallidator/dashboard/dashboardValidator');


router.get("/bookmarks", isAuthenticated, getBookmarksController);
router.get("/comments", isAuthenticated, getCommentsController);

router.get("/create-profile", isAuthenticated, createProfileGetController);
router.post("/create-profile", profileValidation, isAuthenticated,  createProfilePostController);


router.get("/edit-profile", isAuthenticated, editProfileGetController);
router.post("/edit-profile", profileValidation, isAuthenticated, editProfilePostController);


router.get("/",isAuthenticated,dashboardGetController);


//exporting...
module.exports = router;