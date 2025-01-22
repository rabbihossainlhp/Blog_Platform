//Dependencies...
const {Schema,model} = require("mongoose");


//create a schema for profile.

const ProfileSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        trim:true,
        maxlength:100
    },
    bio:{
        type:String,
        trim:true,
        maxlength:500
    },
    profilePic:{
        type:String,
    },
    socialLinks:{
        website:String,
        twitter:String,
        facebook:String,
        instagram:String,
        linkedin:String,
        github:String
    },
    posts:[{
        type:Schema.Types.ObjectId,
        ref:"Post"
    }],
    bookmarks:[{
        type:Schema.Types.ObjectId,
        ref:"Post"
    }]
},{timestamps:true});



//create a model for profile schema
const Profile = model("Profile",ProfileSchema);

//export this model
module.exports = Profile;