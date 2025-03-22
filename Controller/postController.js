exports.createPostGetController =  (req, res, next) => {
    res.render("Pages/dashboard/post/createPost", {
        user: req.user,
        profile: req.profile,
    });
}

exports.createPostPosttController =  (req, res, next) => {}