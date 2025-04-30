//dependencies...
const {model,Schema} = require("mongoose");
const Post = require("./Post");
const User = require("./User");



//Create a Comment Schema 
const CommentSchema = new Schema({
    post:{
        type:Schema.Types.ObjectId,
        ref:'Post',
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    body:{
        type:String,
        required:true,
        trim:true
    },
    replies:[
        {
            body:{
                type:String,
                required:true
            },
            user:{
                type:Schema.Types.ObjectId,
                ref:'User',
                required:true 
            },
            createdAt:{
                type:Date,
                default:new Date()
            }
        }
    ]
},{timestamps:true});


//create the model of this schema...
const Comment = model("Comment",CommentSchema);


//export ....
module.exports = Comment;