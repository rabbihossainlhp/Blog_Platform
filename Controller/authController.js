//Handle the authenticate route's controll...
//dependencies..
const bcrypt = require("bcrypt");
const user = require("../Models/User");

//signup_route_controll
exports.signupGetController = (req,res,next)=>{
    res.render("Pages/auth/signup");
}

exports.signupPostController = async(req,res,next)=>{

    try{
        let {username,email,password} = req.body;
        
        //hash the password
        let hashPass = await bcrypt.hash(password,15);

        let User = new user({
            username,
            email,
            password:hashPass,
        });

        let createdUser = await User.save();
        console.log(createdUser);
        res.render("Pages/auth/signup");

    }catch(er){
        console.log("Something went wrong to create user",er);
    }
    next();

}



//login-route_controll
exports.loginGetController = (req,res,next)=>{

}

exports.loginPostController = (req,res,next)=>{

}


//logout-route_controll
exports.logoutController = (req,res,next)=>{

}