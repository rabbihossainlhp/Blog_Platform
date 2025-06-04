//dependencies...
const {Schema,model} = require("mongoose");
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
        trim:true,
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    tags:[{
        type:String,
        trim:true
    }],
    thumbnail:String,
    readTime:String,
    likes:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    dislikes:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    comments:[{
        type:Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},{timestamps:true});


PostSchema.index({
    title: 'text',
    tags: 'text',
    body: 'text'
},{weights:{
    title: 5,
    tags: 4,
    body: 2
}})


//create a model for post schema
const Post = model("Post",PostSchema);


//export this model
module.exports = Post;