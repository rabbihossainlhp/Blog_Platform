
exports.explorarGetController = (req,res,next)=>{
    res.render('Pages/explorar/explorar',{
        filter:"all",
        currentPage:"Explorar",
    })
}