//dependencies....
const router = require("express").Router();
const {explorarGetController} = require('../Controller/explorarController');


router.get('/',explorarGetController);

module.exports = router;