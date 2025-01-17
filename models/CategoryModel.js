const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    categoryName :{
        type : String,
        required : true
    },
    status : {
        type : Boolean,
        default : true
    },
    blogId : {
        type : Array
    }
},{
    timestamps : true
});

const category = mongoose.model('category' , CategorySchema);

module.exports = category;