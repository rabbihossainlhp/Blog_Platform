// dependencies...
const express = require('express');
const morgan = require("morgan");
const mongoose = require("mongoose");

//+++++third party middlware(express-session)+++++
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);



//necessary variables to connect to the database...
const db_password = encodeURIComponent("123ASDasd@&");


//URI of database..
const MongoUri = `mongodb+srv://hayat:${db_password}@cluster0.ardgf.mongodb.net/Blog_Info`; 

//little configure of MongoStore 
const store = new MongoStore({
    uri:MongoUri,
    collection:"sessions",
    expires:60*60*2*1000
}); 




//Import Routes..
const authRoute = require("./Routes/authRoutes");
const dashboardRoute = require("./Routes/dashboardRoute");



// create an express app_-_-_-_-_-_-_-_-_-_-_-_-_-_-__
const app = express();

//setup view-engine..
app.set("view engine","ejs");
app.set("views","Views");

//import auth middleware..
const {bindUserWithRequest} = require("./Middlewares/authMiddleware");
const setLocals = require("./Middlewares/setLocals");

//array of middlware
const middlware = [
    morgan("dev"),
    express.static("Public"),
    express.urlencoded({extended:true}),
    express.json(),
    session({
        secret: process.env.SECRET_KEY || "KEY",
        resave:false,
        saveUninitialized:false,    
        cookie:{
            maxAge:60*60*2*1000
        },
        store:store
    }),
    bindUserWithRequest(),
    setLocals()
]

//use the middlware...
app.use(middlware);


//Handle the authentic route and others
app.use("/auth",authRoute);
app.use("/dashboard",dashboardRoute);

//handle the basic routes..
app.get("/",(req,res)=>{
    res.send("Welcom to root");
});



//Port number
const Port = process.env.Port || 5050;




//Connect to the database...   
mongoose.connect(MongoUri,{useNewUrlParser:true})
    .then(()=>{   
            console.log("Connected to the database")
            //listening the server.....here
            app.listen(Port,()=>{
                console.log("Server is runnning on port "+Port);
                });         
    })
    .catch(err=>console.log("Something is wrong when trying connect with DB"+err));
