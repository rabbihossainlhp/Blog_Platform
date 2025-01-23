// dependencies...
const express = require('express');
const morgan = require("morgan");

// create an express app
const app = express();

//setup view-engine..
app.set("view engine","ejs");
app.set("views","views");


//array of middlware
const middlware = [
    morgan("dev"),
    express.static("Public"),
    express.urlencoded({extended:true}),
    express.json()
]
//use the middlware...
app.use(middlware);



//handle the basic routes..
app.get("/",(req,res)=>{
    res.send("WElcome to HOme page of our fist blog app")
});



//Port number
const Port = process.env.Port;



//listening the server.....here
app.listen(Port,()=>{
    console.log("Server is runnning on port"+Port);
});