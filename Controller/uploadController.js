const User = require("../Models/User");
const Profile = require("../Models/Profile");

exports.uploadProfilePics = async (req, res, next) => {
    if (req.file) {
        console.log(req.file,"REQ.FILE")
        let profile = await Profile.findOne({ user: req.user._id });
        let profilePics = `Uploads/${req.file.filename}`;
        // console.log("MODIFYED PIC", profilePics)
        try {
            if (profile) {
                await Profile.findOneAndUpdate(
                    { user: req.user._id },
                    { $set: { profilePic: profilePics } },
                    {new:true}
                );
            }
            await User.findOneAndUpdate(
                { _id: req.user._id },
                { $set: { profilePics: profilePics }},
                {new:true}
            );
            
            res.status(200).json({
                profilePics
            });

        } catch (e) {
            console.log("ERROR IN IN"+e)
            res.status(500).json({
                profilePics: req.user.profilePic,
                error: 'Failed to update profile picture',
                message: e.message,
                stack: e.stack  
            });
        }
    } else {console.log("ERROR IN LST")
        res.status(500).json({
            profilePics: req.user.profilePic
        });
    }
};  