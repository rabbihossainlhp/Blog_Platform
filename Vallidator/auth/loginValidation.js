//dependencies....
const {body} = require("express-validator");
const User = require("../../Models/User");
const bcrypt = require("bcrypt");


const loginValidation = 
    [
        body("email")
            .isEmail().withMessage("please provide a valid email")
            .normalizeEmail()
            .custom(async email=>{
                let user = await User.findOne({email});
                if(!user){
                    return Promise.reject("User does not exists");
                }
                return true
            })
        ,
        body("password")
            .isLength({min:6,max:20}).withMessage("password must be between 6 to 20 characters")
            .custom(async (password,{req})=>{
                //extract the email from the request body
                let email  = req.body.email;
                let user = await User.findOne({email});
                if(!user){
                    return Promise.reject("User does not exists");
                }

                let match = await bcrypt.compare(password,user.password);
                if(!match){
                    return Promise.reject("Password does not match");
                }
                return true;
            })
        ,
        body("confirmpassword")
            .isLength({min:6,max:20}).withMessage("Confirm - Password must be match with password")
            .custom(async (confirmpassword,{req})=>{
                if(confirmpassword !== req.body.password){
                    return Promise.reject("Confirm - Password does not match with password");
                }
                return true;
            })
    ]


//exporting...
module.exports = loginValidation;