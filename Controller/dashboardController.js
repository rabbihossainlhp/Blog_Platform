//some dependencies....
const Profile = require("../Models/Profile");

//controller of dashboard

exports.dashboardGetController = async  (req,res,next)=>{
    let profile = await Profile.findOne({user:req.user._id});
    try{
        if(profile){
            return res.render("Pages/dashboard/dashboard",{currentPage:"Dashboard"});
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



exports.createProfilePostController = async(req,res,next)=>{
    next();
}






exports.editProfileGetController = async(req,res,next)=>{
    next();
}


exports.editProfilePostController = async(req,res,next)=>{
    next();
}