//dependencies...
const Post = require('../Models/Post.js');


exports.explorarGetController = async (req,res,next)=>{

    try{
        let posts = await Post.find();

        res.render('Pages/explorar/explorar',{
        filter:"all",
        currentPage:"Explorar",
        posts,
        })
    }catch(e){
        next(e);
    }

    
}