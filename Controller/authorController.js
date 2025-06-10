const User = require('../Models/User');
const Post = require('../Models/Post');
const Profile = require('../Models/Profile');


exports.authorGetController  =  async (req,res,next)=>{
    try{
        const author = await User.findById(req.params.userId)
        const posts = await Post.find({author:req.params.userId}).sort({createdAt:-1});
        const profile = await Profile.findOne({user:req.params.userId});

        res.render('Pages/explorar/author', {
            title: author.name || "Author",
            author,
            posts,
            profile,
            
        })
    
    
    }catch(e){
        next(e);
    }
}