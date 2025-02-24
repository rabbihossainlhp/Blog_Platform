//This is actually a playground space.... so that we can easily check anything here..
//dependencies...
const router = require("express").Router();
const {check,validationResult} = require("express-validator");
const upload = require("../Middlewares/uploadMiddlware"); 


router.get("/play",(req,res,next)=>{
    res.render('Playground/play',{currentPage:"Login"});
});

router.post("/play",
    // [   
    //     check('username')
    //         .not().isEmpty()
    //         .isLength({max:20})
    //         .withMessage("Username must be less than 20 characters")
    //         .trim(),
    //     check('email')
    //         .isEmail()
    //         .normalizeEmail()
    //         .withMessage("Please provide a valid email address"),
    //     check("confirmPassword")
    //         .custom((value,{req})=>{
    //             if(value != req.body.password){
    //                 throw new Error("Password does not match");
    //             }
    //         })
    // ],  
    
    upload.single("my-file"),
    (req,res,next)=>{

    if(req.file){
        console.log(req.file);
    }


    
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.send(errors);
    }

    try{
        res.redirect("/playground/play");
    }catch(err){
        next(err);
    }
    
    // console.log(errors.array());
    // console.log(errors.isEmpty());
    // console.log(errors.mapped());
    // console.log(req.body.email,req.body.username);




});



//export this....
module.exports = router;