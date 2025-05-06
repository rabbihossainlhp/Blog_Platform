//dependencies...
const Post = require('../../Models/Post');

exports.likesController = async (req,res,next)=>{
    let {postId} = req.params;
    let liked = null

    if(!req.user){
        return res.status(403).json({
            errorMessage:"User is not authenticated"
        });
    }
    
    let userId = req.user._id;

    try{
        
        let post = await Post.findById(postId);

        if(post.dislikes.includes(userId)){
            await Post.findOneAndUpdate({_id:postId},{$pull:{dislikes:userId}},{new:true});
        }

        if(post.likes.includes(userId)){
            await Post.findOneAndUpdate({_id:postId}, {$pull:{likes:userId}},{new:true});
            liked = false;
        }else{
            await Post.findOneAndUpdate({_id:postId},{$push:{likes:userId}},{new:true});
            liked = true;
        }

        
        let updatedPost = await Post.findById(postId);
        res.status(200).json({
            liked,
            disliked:false,
            totalLike: updatedPost.likes.length,
            totalDisLike: updatedPost.dislikes.length
        })


    }catch(e){
        console.log(e);
        return res.status(500).json({errorMessage:"server error occoured"})
    }
}




exports.dislikesController = async (req,res,next)=>{
    let {postId} = req.params;
    let userId = req.user._id;

    let disliked = null;

    if(!req.user){
        return res.status(403).json({
            errorMessage:"User is not authenticated"
        })
    }

    try{
        let post = await Post.findById(postId);

        if(post.likes.includes(userId)){
            await Post.findOneAndUpdate({_id:postId},{$pull:{likes:userId}},{new:true});
        }


        if(post.dislikes.includes(userId)){
            await Post.findOneAndUpdate({_id:postId},{$pull:{dislikes:userId}},{new:true});
            disliked = false;
        }else{
            await Post.findOneAndUpdate({_id:postId},{$push:{dislikes:userId}},{new:true});
            disliked = true;
        }

        let updatedPost = await Post.findById(postId);
        res.status(200).json({
            disliked,
            liked:true,
            totalDisLike: updatedPost.dislikes.length,
            totalLike: updatedPost.likes.length
        })

    }catch(e){
        console.log(e);
        return res.status(500).json({errorMessage:"server error occoured"});
    }
}