const { validationResult } = require("express-validator");
const readingTime = require("reading-time");
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

    
    let readTime = readingTime(description).text;

    let post = new Post({
        title,
        body:description,
        tags,
        author:req.user._id,
        thumbnail: '',
        readTime,
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


exports.editPostGetController = async (req, res, next) => {
    let postId = req.params.id;
    let errors = validationResult(req);
    try{
        let post = await Post.findOne({_id:postId, author:req.user._id});

        if(!post){
            return res.redirect("/dashboard");
        }

        res.render("Pages/dashboard/post/editPost",{
            user:req.user,
            profile:req.profile,
            post,
            errors:errors || []
        })

    }catch(e){
        next(e)
    }
}


exports.editPostPostController = async (req,res,next) =>{
    let errors = validationResult(req);
    let {description,title,tags} = req.body;
    let postId = req.params.id;
    let readTime = readingTime(description).text;
    
    try{
        if (tags){
            tags = tags.split(",");
        }else{
            tags = [];
        }

        let post = await Post.findOne({_id:postId, author:req.user._id});
        if(!post){
            return res.redirect("/dashboard");
        }

        
        let updatedPost = await Post.findOneAndUpdate(
            {_id:postId,author:req.user._id},
            {$set:{
                title,
                body:description,
                tags,
                thumbnail: req.file ? `Uploads/${req.file.filename}` : post.thumbnail,
                readTime,
            }},
            {new:true}
        )

        if(!updatedPost){
            return res.redirect("/dashboard");
        }
        await Profile.findOneAndUpdate({user:req.user._id},{$addToSet:{posts:updatedPost._id}},{new:true})
        
        return res.render("Pages/dashboard/post/editPost",{
            user:req.user,
            profile:req.profile,
            post:updatedPost,
            errors:errors || []
        })
        

    }catch(e){
        next(e)
    }
}