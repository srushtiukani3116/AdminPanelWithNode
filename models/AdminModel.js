const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const imagepath = '/uploads/AddImage';

const AdminSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    hobby : {
        type : Array,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
},{
    timestamps : true
});

const ImageStorage = multer.diskStorage({
    destination : (req,file,cb) =>{
        cb(null , path.join(__dirname,'..',imagepath))
    },
    filename : (req,file,cb) =>{
        cb(null , file.fieldname+'-'+Date.now());
    }
})

AdminSchema.statics.uploadImageFile = multer({storage : ImageStorage}).single('image');
AdminSchema.statics.imgpath = imagepath;

const AddModel = mongoose.model('AddModel' , AdminSchema);

module.exports = AddModel;