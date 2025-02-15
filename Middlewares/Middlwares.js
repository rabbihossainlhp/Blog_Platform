//dependencies...
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const {bindUserWithRequest} = require("./authMiddleware");
const setLocals = require("./setLocals");

//db_uri//
const MongoUri = process.env.Db_admin;


//little configure of MongoStore 
const store = new MongoStore({
    uri:MongoUri,
    collection:"sessions",
    expires:60*60*2*1000
});     

const middlware = [
    morgan("dev"),
    express.static("Public"),
    express.urlencoded({extended:true}),
    express.json(),
    session({
        secret: process.env.Secret_Key || "KEY",
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


module.exports = app =>{
    middlware.forEach(middlware=>{
        app.use(middlware);
    })
}