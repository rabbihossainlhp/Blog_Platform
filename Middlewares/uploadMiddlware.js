//dependencies...
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//_-__-___--_-_
const uploadDir = path.join(__dirname,"../Public/Uploads");
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}


//storage engine...
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploadDir);
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});


//try to upload the file...
const upload = multer({
    storage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:(req,file,cb)=>{
        const types = /jpeg|jpg|png|gif/;
        const extname = types.test(path.extname(file.originalname).toLocaleLowerCase());
        const mimetype = types.test(file.mimetype);

        if(extname && mimetype){
            cb(null,true);
        }else{
            cb(new Error("only images are allowed"));
        }
    }
});





//export this...
module.exports = upload;