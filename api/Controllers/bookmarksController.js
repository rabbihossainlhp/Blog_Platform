//dependencies....
const Profile = require('../../Models/Profile');


exports.getBookmarksController = async (req,res,next) =>{
    let {postId} = req.params;
    let bookmark = null;

    if(!req.user){
        return res.status(403).josn({
            errorMessage:"User is not authenticated"
        })
    }

    let userId = req.user._id;


    try{

        let profile = await Profile.findOne({user:userId});
        if(profile.bookmarks.includes(postId)){
            await  Profile.findOneAndUpdate({user:userId},{$pull:{bookmarks:postId}}, {new:true});
            bookmark = false;
        }else{
            await Profile.findOneAndUpdate({user:userId},{$push:{bookmarks:postId}},{new:true});
            bookmark = true;
        }

        
        res.status(200).json({
            successMessage:"You've Successfully added post on bookmarks",
            bookmark,
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({errorMessage:"server error occoured"});
    }
}