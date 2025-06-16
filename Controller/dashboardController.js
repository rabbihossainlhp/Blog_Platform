//some dependencies....
const Profile = require("../Models/Profile");
const Comment = require("../Models/Comment");
const User = require("../Models/User");
const errorFormatter = require('../Utils/validationErrFormatter');
const {validationResult} = require('express-validator');
//controller of dashboard

exports.dashboardGetController = async  (req,res,next)=>{
    
    try{
        let profile = await Profile.findOne({user:req.user._id})
            .populate({
                path:"posts",
                select:'title thumbnail'
            })
            .populate({
                path:"bookmarks",
                select:'title thumbnail'
            })

        let commentsCount = 0;
        if(profile && profile.posts && profile.posts.length > 0){
            const postId = profile.posts.map(post => post._id);
            commentsCount = await Comment.countDocuments({post:{$in:postId}});
        }

        if(profile){
            return res.render("Pages/dashboard/dashboard",{
                title:"Dashboard",
                currentPage:"Dashboard",
                posts:profile.posts,
                bookmarks:profile.bookmarks,
                commentsCount
            });
        }
        res.redirect("/dashboard/create-profile");
    }catch(e){
        next(e);
    }
};




exports.createProfileGetController = async(req,res,next)=>{
    try{
        let profile = await Profile.findOne({user:req.user._id});
        if(profile){
            return res.redirect("/dashboard/edit-profile");
        }
        res.render("Pages/dashboard/profile/createProfile",{currentPage:"Create Profile"});
    }catch(e){
        next(e);
    }
}


exports.createProfilePostController = async (req,res,next)=>{    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('Pages/dashboard/profile/createProfile', {
            user: req.user,
            errors: errors.array(),
            currentPage: "Create Profile"
        }); 
    }   
    
    let {
        name,
        title,
        bio,
        website,
        twitter,
        facebook,
        instagram,
        linkedin,
        github,
        
    } = req.body;

    try{
        
        let newProfile = new Profile({
            user:req.user._id,
            name,
            title,
            bio,
            profilePic:req.user.profilePics || 'default.png',
            socialLinks:{
                website : website || " ",
                twitter : twitter || " ",
                facebook : facebook || " ",
                instagram : instagram || " ",
                linkedin : linkedin || " ",
                github : github || " ",       
            },  
            
        })
        
        await newProfile.save();
        res.redirect('/dashboard');

    }catch(e){
        next(e);
    }
    

}





exports.editProfileGetController = async(req,res,next)=>{
    try{
        let profile = await Profile.findOne({user:req.user._id});
        if(!profile){
            return res.redirect("/dashboard/create-profile");
        }
        res.render('Pages/dashboard/profile/editProfile',{
            user:req.user,
            profile:profile, 
        })

    }catch(e){
        next(e);
    }
}


exports.editProfilePostController = async(req,res,next)=>{
    let errors = validationResult(req);
    let profile = await Profile.findOne({user:req.user._id});

    if(!errors.isEmpty()){
        return res.render('Pages/dashboard/profile/editProfile',{
            user:req.user,
            profile:profile,
            errors: errors.array(),
            currentPage:'Edit Profile'
        });
    }

    let{
        name,
        title,
        bio,
        website,
        twitter,
        facebook,
        instagram,
        linkedin,
        github,
    } = req.body;

    try{
        await Profile.findOneAndUpdate(
            {user:req.user._id},
            {$set:{
                name,
                title,
                bio,
                profilePic:req.user.profilePics || "default.png",
                socialLinks:{
                    website:website || "",
                    twitter:twitter || "",
                    facebook:facebook || "",
                    instagram:instagram || "",
                    linkedin:linkedin || "",
                    gitub:github || ""
                    }
                }
            },
            {new:true}
        );
        res.redirect('/dashboard');
    }catch(e){
        next(e);
    }
}





exports.getBookmarksController = async (req,res,next)=>{

    try{
        let profile = await Profile.findOne({user:req.user._id})
                    .populate({
                        path:'bookmarks',
                        model:'Post',
                        select:'title thumbnail author ',
                        populate:{
                            path:'author',
                            select:'username'
                        }
                    });

        
        res.render('Pages/dashboard/bookmarks',{
            profile:profile,
            currentPage:'Bookmarks',
        })
    }catch(e){
        next(e);
    }
}

exports.getCommentsController = async (req,res,next)=>{
    try{
        let profile = await Profile.findOne({user:req.user._id});
        let comments = await Comment.find({post:{$in:profile.posts}})
            .populate({
                path:'post',select:'title'
            })
            .populate({
                path:'user', select:'username profilePics'
            })
            .populate({
                path:'replies.user',select:'username profilePics'
            })

            let commentsCount = comments.length;

            res.render('Pages/dashboard/comments',{
                comments,
                currentPage:'Comments',
                commentsCount
            }); 
    }catch(e){
        next(e);
    }
}