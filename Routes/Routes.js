//dependencies...
const authRoutes = require("./authRoutes");
const dashboardRoute = require("./dashboardRoute");
const playground = require("../Playground/play");
const uploadRoutes = require("./uploadRoutes");
const postRoute = require('./postRoute');

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
    },
    {
        path:"/playground",
        handler:playground
    },
    {
        path:"/uploads",
        handler:uploadRoutes
    },
    {
        path:"/post",
        handler:postRoute
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