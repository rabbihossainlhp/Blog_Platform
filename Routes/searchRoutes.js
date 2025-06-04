const router = require('express').Router();
const {searchResultGetController} = require("../Controller/searchController")

router.get("/",searchResultGetController);

module.exports = router;