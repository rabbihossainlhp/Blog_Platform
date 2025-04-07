const { validationResult } = require("express-validator")
const Post = require("../Models/Post");
const Profile = require("../Models/Profile");


exports.createPostGetController =  (req, res, next) => {
    let errors = validationResult(req);
    
    res.render("Pages/dashboard/post/createPost", {
        user: req.user,
        profile: req.profile,
        errors: [],
    });
}

exports.createPostPosttController = async (req, res, next) => {
    let {description,title,tags} = req.body;
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.render("Pages/dashboard/post/createPost",{
            user:req.user,
            profile:req.profile,
            errors:errors.array()
        })
    }


    if (tags){
        tags = tags.split(",")
    }


    let post = new Post({
        title,
        body:description,
        tags,
        author:req.user._id,
        thumbnail: '',
        likes:[],
        dislikes:[],
        comments:[]
    })

    if(req.file){
        post.thumbnail = `Uploads/${req.file.filename}`
    }


    try{
        let createdPost = await post.save();
        await Profile.findOneAndUpdate({user:req.user._id},{$push:{posts:createdPost._id}},{new:true})
        return res.redirect(`/post/edit/${createdPost._id}`)
    }catch(e){
        next(e)
    }

}