//dependencies...
const Post = require('../../Models/Post');
const Comment = require('../../Models/Comment');

exports.commentController = async (req,res,next) =>{
    let {postId} = req.params;
    let {body} = req.body;

    if(!req.user){
        return res.status(403).json({
            errorMessage:"User is not authenticated"
        });
    }

    let comment = new Comment({
        post:postId,
        user:req.user._id,
        body,
        replies:[],
    })

    try{
        let createdComment = await comment.save();
        await Post.findOneAndUpdate({_id:postId},{$push:{comments:createdComment._id}},{new:true})

        let comment_JSON = await Comment.findById(createdComment._id).populate({
            path:'user',
            select:'profilePics username'
        })

        return res.status(201).json({
            message:"Comment created successfully",
            comment:comment_JSON
        })

    }catch(e){
        console.log(e);
        return res.status(500).json({errorMessage:"server error occurred"});
    }
}