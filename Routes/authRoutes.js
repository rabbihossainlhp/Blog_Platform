//here will be write only authenticate routes...
//dependencies....
const router = require("express").Router();


const {
    signupGetController,
    signupPostController,
    loginGetController,
    loginPostController,
    logoutController,
    changePasswordGetController,
    changePasswordPostController
} = require("../Controller/authController");

//import signupValidation/loginValidation...{extract }
const signupValidation = require("../Vallidator/auth/signupValidation");
const loginValidation = require("../Vallidator/auth/loginValidation");

//impoort the authMiddleware...
const {unAuthenticated, isAuthenticated} = require("../Middlewares/authMiddleware");

//signup_route...
router.get("/signup", unAuthenticated, signupGetController);
router.post("/signup",signupValidation, signupPostController);

//login_route...
router.get("/login", unAuthenticated,loginGetController);
router.post("/login" ,loginValidation, loginPostController);

//logout_route...
router.get("/logout",logoutController);


router.get('/change-password', isAuthenticated, changePasswordGetController);
router.post('/change-password', isAuthenticated, changePasswordPostController);

    
//export the router...
module.exports = router;