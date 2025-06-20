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
        let posts = await Post.find({author:req.user._id});
        res.render("Pages/dashboard/post/posts",{
            user:req.user,
            profile:req.profile,
            posts
        }) 
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
        let posts = await Post.find({author:req.user._id});
        return res.render("Pages/dashboard/post/posts",{
            user:req.user,
            profile:req.profile,
            post:updatedPost,
            posts,
            errors:errors || []
        })
        

    }catch(e){
        next(e)
    }
}






//delete post controller start from here...
exports.getDeletePostController = async (req, res, next) =>{
    let postId = req.params.id;

    try{
        let post = Post.findOne({author:req.user._id, _id:postId});
        if(!post){
            let error = new Error("404 Post not found");
            error.status = 404;
            throw error;
        }

        await Post.findOneAndDelete({_id:postId});
        await Profile.findOneAndUpdate({user:req.user._id},{$pull:{posts:postId}},{new:true});
        return res.redirect("/post");




    }catch(e){
        next(e)
    }
}








exports.getAllPostsController = async (req, res, next) => {
    try{
        let posts = await Post.find({author:req.user._id})
        
        res.render("Pages/dashboard/post/posts",{
            user:req.user,
            profile:req.profile,
            posts
        })
    }catch(e){
        next(e)
    }
}