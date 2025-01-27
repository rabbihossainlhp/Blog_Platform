//Dependencies...
const {Schema,model} = require("mongoose");
const User = require("./User");
const Post = require("./Post");


//create a schema for profile.
const ProfileSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    name:{
        type:String,
        trim:true,
        maxlength:50,
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
        ref:'Post'
    }],
    bookmarks:[{
        type:Schema.Types.ObjectId,
        ref:'Post'
    }]
},{timestamps:true});



//create a model for profile schema
const Profile = model("Profile",ProfileSchema);

//export this model
module.exports = Profile;