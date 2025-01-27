//Handle the authenticate route's controll...
//dependencies..
const user = require("../Models/User");

//signup_route_controll
exports.signupGetController = (req,res,next)=>{
    res.render("Pages/auth/signup");
}

exports.signupPostController = async(req,res,next)=>{
    let {username,email,password,confirmpassword} = req.body;

    let User = new user({
        username,
        email,
        password,
        confirmpassword
    });

    try{
        let createdUser = await User.save();
        console.log(createdUser);
    }catch(er){
        console.log("SOmething went wrong to create user",er);
    }
    res.render("Pages/auth/signup");


}



//login-route_controll
exports.loginGetController = (req,res,next)=>{

}

exports.loginPostController = (req,res,next)=>{

}


//logout-route_controll
exports.logoutController = (req,res,next)=>{

}