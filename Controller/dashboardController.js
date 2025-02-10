//controller of dashboard

exports.dashboardGetController = (req,res,next)=>{
    res.render("Pages/dashboard/dashboard",{currentPage:"Dashboard"});
};