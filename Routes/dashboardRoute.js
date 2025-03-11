//dependencies....
const router = require("express").Router();
const {isAuthenticated} = require("../Middlewares/authMiddleware");
const {
    dashboardGetController,
    createProfileGetController,
    createProfilePostController,
    editProfileGetController,
    editProfilePostController
} = require("../Controller/dashboardController");

const profileValidation = require('../Vallidator/dashboard/dashboardValidator');

router.get("/",isAuthenticated,dashboardGetController);



router.get("/create-profile", isAuthenticated, createProfileGetController);
router.post("/create-profile", profileValidation, isAuthenticated,  createProfilePostController);


// router.get("/edit-profile", isAuthenticated, editProfileGetController);
// router.post("/edit-profile", isAuthenticated, editProfilePostController);




//exporting...
module.exports = router;