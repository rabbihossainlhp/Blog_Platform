//dependencies...
const User = require("../Models/User");
const Profile = require("../Models/Profile");



//main function...
exports.uploadProfilePics = async (req,res,next) => {

    if(req.file){    
        let profile = await Profile.findOne({user:req.user._id});
        let profilePics = `Uploads/${req.file.filename}`;
        try{
            if(profile){
                await Profile.findOneAndUpdate(
                    {user:req.user._id},
                    {$set:{profilePics}}
                ); 
            }
            await User.findOneAndUpdate({_id:req.user._id},{$set:{profilePics}});
            res.status(200).json({
                profilePics
            }); 

        }catch(e){
            res.status(500).json({
                profilePics:req.user.profilePics
            });
        }   
    }else{
        res.status(500).json({
            profilePics:req.user.profilePics
        });
    }
}