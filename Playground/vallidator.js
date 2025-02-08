//This is actually a playground space.... so that we can easily check anything here..
//dependencies...
const router = require("express").Router();
const {check,validationResult} = require("express-validator");


router.get("/vallidator",(req,res,next)=>{
    res.render('Playground/signup',{currentPage:"Login"});
    next();
});

router.post("/vallidator",
    [   
        check('username')
            .not().isEmpty()
            .isLength({max:20})
            .withMessage("Username must be less than 20 characters")
            .trim(),
        check('email')
            .isEmail()
            .normalizeEmail()
            .withMessage("Please provide a valid email address"),
        check("confirmPassword")
            .custom((value,{req})=>{
                if(value != req.body.password){
                    throw new Error("Password does not match");
                }
            })
    ],  
    
    (req,res,next)=>{
    let errors = validationResult(req);
    res.send(errors);
    // console.log(errors.array());
    // console.log(errors.isEmpty());
    // console.log(errors.mapped());
    console.log(req.body.email,req.body.username);
    next();

});



//export this....
module.exports = router;