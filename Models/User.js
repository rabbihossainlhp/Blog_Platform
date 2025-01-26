//dependencies.....
const {model,Schema} = require("mongoose");
const Profile = require("./Profile");


//create a Schema...
const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        maxlength:20,
        trim:true
    },
    email:{
        type:String, 
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    profile:{
        type:Schema.Types.ObjectId,
        ref:Profile
    },
},{timestamps:true});


//create schema's model..
const User = model("User",UserSchema);

//export this model
module.exports = User;