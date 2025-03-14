const router = require('express').Router();
const { isAuthenticated } = require("../Middlewares/authMiddleware");
const upload = require("../Middlewares/uploadMiddlware");
const { uploadProfilePics } = require("../Controller/uploadController");

router.post("/profilepics", isAuthenticated, upload.single("profilePics"), uploadProfilePics);

module.exports = router;    