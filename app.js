// dependencies...
const express = require('express');
const morgan = require("morgan");
const mongoose = require("mongoose");

//Import Routes..
const authRoute = require("./Routes/authRoutes");

// create an express app
const app = express();

//setup view-engine..
app.set("view engine","ejs");
app.set("views","Views");






//array of middlware
const middlware = [
    morgan("dev"),
    express.static("Public"),
    express.urlencoded({extended:true}),
    express.json()
]
//use the middlware...
app.use(middlware);


//Handle the authentic route
app.use("/auth",authRoute);

//handle the basic routes..
app.get("/",(req,res)=>{
    res.send("Welcom to root");
});



//Port number
const Port = process.env.Port || 5050;


//necessary variables to connect to the database...
const db_password = encodeURIComponent("123ASDasd@&");


//Connect to the database...   
mongoose.connect(`mongodb+srv://hayat:${db_password}@cluster0.ardgf.mongodb.net/Blog_Info`,{useNewUrlParser:true})
    .then(()=>{   
            console.log("Connected to the database")
            //listening the server.....here
            app.listen(Port,()=>{
                console.log("Server is runnning on port "+Port);
                });         
    })
    .catch(err=>console.log("Something is wrong when trying connect with DB"+err));
