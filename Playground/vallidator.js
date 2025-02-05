//This is actually a playground space.... so that we can easily check anything here..
//dependencies...
const router = require("express").Router();



router.get("/vallidator",(req,res,next)=>{
    

    res.render('Playground/signup',{currentPage:"Login"});
    next();
});

router.post("/vallidator",(req,res)=>{

});



//export this....
module.exports = router;