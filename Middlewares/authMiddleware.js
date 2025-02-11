//dependencies...
const User = require("../Models/User");


exports.bindUserWithRequest = () => {
    return async (req,res,next)=>{
        if(!req.session.isLoggedIn){
            return next();
        }

        try{
            
            let user = await User.findById(req.session.user._id);
            req.user = user;
            next();
        }
        catch(er){
            next(er);
        }
    }
}


//isAuthenticated middleware
exports.isAuthenticated = (req,res,next)=>{
    if(!req.session.isLoggedIn){
        return res.redirect("/auth/login");
    }
    next();
}


exports.unAuthenticated = (req,res,next)=>{
    if(req.session.isLoggedIn){
        return res.redirect("/dashboard");
    }
    next();
}