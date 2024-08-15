const multer = require('multer');
const sharp = require("sharp");
const path = require("path");


// first it will store to local using multer
const multerStorage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname, "../public/images"));

    },
    
})

const multerFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }
    else{
        cb({
            message:"Unsuported file format",
        },
        false
        );
    }
};

const uploadPhoto = multer({
    storage: multerStorage,
    fileFilter : multerFilter,
    limits: { fieldSize:2000000}
});

const bookImageResize = async(req,res,next)=>{
    if(!req.files) return next();
    await Promise.all( req.files.map(async(file)=>{
        await sharp(file.path).resize(300,300).toFormat('jpeg').jpeg({quality:90}).toFile(`public/images/books/${file.filename}`);
    }));
    next();
};

module.exports = {uploadPhoto , bookImageResize};