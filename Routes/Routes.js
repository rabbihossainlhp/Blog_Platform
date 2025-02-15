//dependencies...
const authRoutes = require("./authRoutes");
const dashboardRoute = require("./dashboardRoute");

const routes = [
    {
        path:"/auth",
        handler:authRoutes
    },
    {
        path:"/dashboard",
        handler:dashboardRoute
    },
    {
        path:"/",
        handler:(req,res)=>{
            res.json({
                message:"Welcome to Root"
            })
        }
    }
]

module.exports = app =>{
    routes.forEach(route=>{
        if(route.path == "/"){
            app.get(route.path,route.handler);
        }else{
            app.use(route.path,route.handler);
        }
    })
}