// dependencies...
const express = require('express');
const mongoose = require("mongoose");
require("dotenv").config();
// const config = require("config");

//URI of database..
const MongoUri = process.env.Db_admin;


//Import Routes..
const setRoute = require("./Routes/Routes");
//array of middlware from another directory...
const setMiddleware = require("./Middlewares/Middlwares");




// create an express app_-_-_-_-_-_-_-_-_-_-_-_-_-_-__
const app = express();

//setup view-engine..
app.set("view engine","ejs");
app.set("views","Views");

//use the middlware...
setMiddleware(app);
//using  route from the separed directory {route}
setRoute(app);


//Port number
const Port = process.env.Port;


//Connect to the database...   
mongoose.connect(MongoUri,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{   
            console.log("Connected to the database")
            //listening the server.....here
            app.listen(Port,()=>{
                console.log("Server is runnning on port "+Port);
                });         
    })
    .catch(err=>console.log("Something is wrong when trying connect with DB"+err));
