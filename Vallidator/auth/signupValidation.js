//dependencies....
const {body} = require("express-validator");
const User = require("../../Models/User"); 

//signup validation using express-validator...
const signupValidation = [
    body("username").isLength({min:2,max:20})
        .trim().withMessage("Username must be between 2 to 20 characters")
        .custom(async username=>{
            let user = await User.findOne({username});
            if(user){
                return Promise.reject("Username already exists");
            }
            return true;
        })
    ,

    body("email")
        .isEmail().withMessage("Please provide a valid email")
        .normalizeEmail()
    ,

    body("password")
        .isLength({min:6,max:20}).withMessage("Password must be between 6 to 20 characters")
    ,   

    body("confirmpassword")
        .isLength({min:6,max:20}).withMessage("Confirm - Password must be match with password")
        .custom((value,{req})=>{
            if(value !== req.body.password){
                return Promise.reject("Password does not match");
            }
            return true;
        })
        
]   


//export this module...
module.exports = signupValidation;