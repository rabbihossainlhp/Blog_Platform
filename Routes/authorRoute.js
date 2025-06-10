const router = require("express").Router();
const {authorGetController} = require('../Controller/authorController');


router.get('/:userId', authorGetController);

module.exports = router;