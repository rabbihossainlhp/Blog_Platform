//dependencies...
const {Schema,model} = required("mongoose");
const User = require("./User");
const Comment = require("./Comment");


//create a schema for post
const PostSchema =  new Schema({
    title:{
        type:String,
        required:true,
        maxlength:100,
        trim:true
    },
    body:{
        type:String,
        required:true,
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:User
    },
    tags:[{
        type:String,
        trim:true
    }],
    thumbnail:String,
    readTime:String,
    likes:[{
        type:Schema.Types.ObjectId,
        ref:User
    }],
    dislikes:[{
        type:Schema.Types.ObjectId,
        ref:User
    }],
    comments:[{
        type:Schema.Types.ObjectId,
        ref: Comment
    }]
},{timestamps:true});



//create a model for post schema
const Post = model("Post",PostSchema);


//export this model
module.exports = Post;