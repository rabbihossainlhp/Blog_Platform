//dependencies....
const router = require("express").Router();
const {dashboardGetController} = require("../Controller/dashboardController");


router.get("/",dashboardGetController);


//exporting...
module.exports = router;