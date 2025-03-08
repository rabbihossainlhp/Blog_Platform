// dependencies.... 
const {body} = require("express-validator");
const validator = require('validator')

const socialValidator = (value)=>{
    if(value){
        if(!validator.isURL(value)){
            throw new Error("Please provide vallid social links");
        }
    }
    return true;
}

module.exports = [

    body('name')
        .not().isEmpty().withMessage("Name Cant' be Empty")
        .isLength({max:50}).withMessage("Name should contain 50 or less Charecter")
    ,
    
    body('title')
        .not().isEmpty().withMessage("Title Cant' be Empty")
        .isLength({max:100}).withMessage("Title should contain 100 or less Charecter")
    ,

    body('bio')
        .not().isEmpty().withMessage("bio Cant' be Empty")
        .isLength({max:500}).withMessage("bio should contain 500 or less Charecter")
    ,

    body('website')
        .custom(socialValidator)
    ,
    body('facebook')
        .custom(socialValidator)
    ,
    body('instagram')
        .custom(socialValidator)
    ,
    body('linkedin')
        .custom(socialValidator)
    ,
    body('github')
        .custom(socialValidator)    
    ,
    body('twitter')
        .custom(socialValidator)

]