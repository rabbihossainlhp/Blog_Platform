//dependencies....
const router = require("express").Router();
const {dashboardGetController} = require("../Controller/dashboardController");
const {isAuthenticated} = require("../Middlewares/authMiddleware");


router.get("/",isAuthenticated,dashboardGetController);


//exporting...
module.exports = router;