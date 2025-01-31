//Handle the authenticate route's controll...
//dependencies..
const bcrypt = require("bcrypt");
const user = require("../Models/User");

//signup_route_controll
exports.signupGetController = (req,res,next)=>{
    res.render("Pages/auth/signup",{currentPage:"Signup"});
    next();
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
        res.render("Pages/auth/login",{currentPage:"Login"});

    }catch(er){
        console.log("Something went wrong to create user",er);
    }
    next();

}






//login-route_controll
exports.loginGetController = (req,res,next)=>{
    res.render("Pages/auth/login",{currentPage:"Login"});
    next();
}




exports.loginPostController = async (req,res,next)=>{
    let {email,password} = req.body;
    
    try{
        let User = await user.findOne({email});
        if(!User){
            return res.status(400).json({error:"Invalid Credentials"});
        }

        let match = await bcrypt.compare(password, User.password);
        if(!match){
            return res.status(400).json({error:"Invalid Credentials"});
        }
        
        console.log("User logged in successfully"+User);
        res.render("Pages/auth/login",{currentPage:"Home"});
    }catch(er){
        console.log("Something went wrong to find user",er);
        next();
    }
}




//logout-route_controll
exports.logoutController = (req,res,next)=>{

}