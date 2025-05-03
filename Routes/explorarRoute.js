//dependencies....
const router = require("express").Router();
const {
    explorarGetController,
    getSinglePostController,
} = require('../Controller/explorarController');


router.get('/',explorarGetController);

router.get('/:postId',getSinglePostController);

module.exports = router;