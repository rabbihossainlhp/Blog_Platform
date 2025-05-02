//dependencies...
const moment = require('moment');
const Post = require('../Models/Post.js');


//generate date...
const generateDate = (days) =>{
    let date = moment().subtract(days,'days');
    return date.toDate();
}

const generateFilter = (filter) =>{
    let filterObject = {};
    let order = 1;

    switch(filter){

        case "week":{
            filterObject = {
                createdAt:{
                    $gt:generateDate(7)
                }
            }
            order = -1;
            break;
        }
        case "month":{
            filterObject = {
                createdAt:{
                    $gt:generateDate(30)
                }
            }
            order = -1;
            break;
        }
        case "all":{
            order = -1;
            break;
        }
        

    }
    return {
        filterObject,
        order
    }

}





exports.explorarGetController = async (req,res,next)=>{

    let filter = req.query.filter || "latest";
    let {filterObject,order} = generateFilter(filter.toLowerCase());

    try{
        let posts = await Post.find(filterObject)
            .populate('author','username')
            .sort(order === 1 ? '-createdAt' :'createdAt');
    

        res.render('Pages/explorar/explorar',{
        filter,
        currentPage:"Explorar",
        posts,
        })
    }catch(e){
        next(e);
    }

    
}