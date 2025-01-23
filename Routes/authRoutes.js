//here will be write only authenticate routes...
//dependencies....
const router = require("express").Router();
const {
    signupGetController,
    signupPostController,
    loginGetController,
    loginPostController,
    logoutController
} = require("../Controller/authController");

//signup_route...
router.get("/signup",signupGetController);
router.post("/signup",signupPostController);

//login_route...
router.get("/login",loginGetController);
router.post("/login",loginPostController);

//logout_route...
router.get("/logout",logoutController);


//export the router...
module.exports = router;