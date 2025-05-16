//dependencies...
const moment = require('moment');
const Post = require('../Models/Post.js');
const Profile = require('../Models/Profile.js');


//generate date...
const generateDate = (days) =>{
    let date = moment().subtract(days,'days');
    return date.toDate();
}

const generateFilter = (filter) =>{
    let filterObject = {};
    let order = 1;

    switch(filter){

        case "week":{
            filterObject = {
                createdAt:{
                    $gt:generateDate(7)
                }
            }
            order = -1;
            break;
        }
        case "month":{
            filterObject = {
                createdAt:{
                    $gt:generateDate(30)
                }
            }
            order = -1;
            break;
        }
        case "all":{
            order = -1;
            break;
        }
        
    }
    return {
        filterObject,
        order
    }

}





exports.explorarGetController = async (req,res,next)=>{

    let filter = req.query.filter || "latest";
    let {filterObject,order} = generateFilter(filter.toLowerCase());

    let currentPage = parseInt(req.query.page) || 1;
    let PostPerPage = 10;

    try{
        let posts = await Post.find(filterObject)
            .populate('author','username')
            .sort(order === 1 ? '-createdAt' :'createdAt')
            .skip((PostPerPage * currentPage) - PostPerPage )
            .limit(PostPerPage);
    

        let totalPosts = await Post.countDocuments();
        let totalPage = Math.ceil(totalPosts / PostPerPage);
        
        let bookmarks = [];
        if(req.user){
            let profile = await Profile.findOne({user:req.user._id});
            if(profile){
                bookmarks = profile.bookmarks;
            }
        }
        

        res.render('Pages/explorar/explorar',{
        filter,
        currentPage,
        totalPage,
        PostPerPage,
        posts,
        bookmarks,

        })
    }catch(e){
        next(e);
    }

}



exports.getSinglePostController = async (req,res,next)=>{
    let postId = req.params.postId;

    try{
        let post = await Post.findById(postId).populate({
            path:'comments',
            populate:{
                path:'user',
                select:'profilePics username'
            }
        })
        .populate('author');
        

        let bookmarks = [];
        if(req.user){
            let profile = await Profile.findOne({user:req.user._id});
            if(profile){
                bookmarks = profile.bookmarks;
            }
        }

        if(!post){
            let error = new Error("404 Post not found");
            error.status = 404;
            throw error;
        }
        let postDate = moment(post.createdAt).format('YYYY-MM-DD');

        res.render('Pages/explorar/singlePage',{
            post,
            postDate,
            currentPage:"singlePage",
            bookmarks,
        })
    }catch(e){
        next(e);
    }

}