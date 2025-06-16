//Handle the authenticate route's controll...
//dependencies..
const bcrypt = require("bcrypt");
const user = require("../Models/User");
const {validationResult} = require("express-validator");
const errorFormatter = require("../Utils/validationErrFormatter");


//signup_route_controll
exports.signupGetController = (req,res,next)=>{
    res.render("Pages/auth/signup",{currentPage:"Signup",errors:{},value:{}});
    next();
}


exports.signupPostController = async(req,res,next)=>{
    //distructuring the data 
    let {username,email,password} = req.body;
    
    let errors = validationResult(req).formatWith(errorFormatter);
    if(!errors.isEmpty()){
        return res.render("Pages/auth/signup",{currentPage:"Signup",errors:errors.mapped(),value:{username,email,password}});
    }

    try{        
        //hash the password
        let hashPass = await bcrypt.hash(password,15);

        let User = new user({
            username,
            email,
            password:hashPass,
        });

        let createdUser = await User.save();
        console.log(createdUser);
        res.render("Pages/auth/login",{currentPage:"Login", value:{email,password}});

    }catch(er){
        console.log("Something went wrong to create user",er);
    }
    next();

}






//login-route_controll
exports.loginGetController = (req,res,next)=>{
    console.log(req.session.isLoggedIn, req.session.user)
    res.render("Pages/auth/login",{currentPage:"Login",errors:{},value:{}});
    next();
}



exports.loginPostController = async (req,res,next)=>{
    let {email,password,confirmpassword} = req.body;

    let errors = validationResult(req).formatWith(errorFormatter);
    if(!errors.isEmpty()){
        return res.render("Pages/auth/login",{currentPage:"Login",errors:errors.mapped(),value:{email,password}});
    }
    
    try{

        let User = await user.findOne({email});
        if(!User){
            return res.status(400).json({error:"Invalid Credentials"});
        }

        let match = await bcrypt.compare(password, User.password);
        if(!match){
            return res.status(400).json({error:"Invalid Credentials"});
        }
        
        req.session.isLoggedIn = true;
        req.session.user = User;
        req.session.save(err=>{
            if(err){
                console.log("Something went wrong to save session",err);
                next(err);
            }
            res.redirect("/dashboard");
        });
        console.log("User logged in successfully::::"+User);
    }catch(er){
        console.log("Something went wrong to find user",er);
        next();
    }
}




//logout-route_controll
exports.logoutController = (req,res,next)=>{
    req.session.destroy(err=>{
        if(err){
            console.log("Something went wrong to logout",err);
            return next(err);
        }
        res.redirect("/auth/login");
        res.render("Pages/auth/login",{currentPage:"Login",errors:{},value:{}});
        });
}




//change-password-route_controll
exports.changePasswordGetController = (req,res,next)=>{
    res.render('Pages/auth/changePassword',{
        title:"Change Password",
        currentPage:"Change Password",
        errors:{},
        value:{
            oldPassword:"",
            newPassword:"",
            confirmNewPassword:""
        }
    });
}



exports.changePasswordPostController = async (req,res,next)=>{
    let {oldPassword,newPassword,confirmNewPassword} = req.body;


    if(newPassword !== confirmNewPassword){
        return res.render('Pages/auth/changePassword',{
            title:"Change Password",
            currentPage:"Change Password",
            errors:{confirmNewPassword:{msg:"New password and confirm password do not match"}},
            value:{oldPassword,newPassword,confirmNewPassword},
        });
    }

    try{
        let errors = validationResult(req).formatWith(errorFormatter);
        if(!errors.isEmpty()){
            return res.render('Pages/auth/changePassword',{
                title:"Change Password",
                currentPage:"Change Password",
                errors:errors.mapped(),
                value:{oldPassword,newPassword,confirmNewPassword},
            });
        }

        let match = await bcrypt.compare(oldPassword, req.user.password);
        if(!match){
            return res.render('Pages/auth/changePassword',{
                title:"Change Password",
                currentPage:"Change Password",
                errors:{oldPassword:{msg:"Old password is incorrect"}},
                value:{oldPassword,newPassword,confirmNewPassword},
            });
        }

        let hashPass = await bcrypt.hash(newPassword, 15);
        await user.findOneAndUpdate(
            {_id:req.user._id},
            {$set:{password:hashPass}},
            {new:true}
        )
        return res.render('Pages/auth/changePassword',{
            title:"Change Password",
            currentPage:"Change Password",
            errors:{},
            value:{oldPassword:"",newPassword:"",confirmNewPassword:""},
            success:"Password changed successfully"
        })
    }catch(e){
        next(e);
    }

    

}