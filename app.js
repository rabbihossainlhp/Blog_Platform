// dependencies...
const express = require('express');


// create an express app
const app = express();




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