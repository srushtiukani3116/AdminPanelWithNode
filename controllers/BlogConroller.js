const Blog = require("../models/BlogModel");
const category = require("../models/CategoryModel");

module.exports.AddBlog = async (req,res)=>{
    try{
        let CategoryData = await category.find();
        if(CategoryData){
            return res.render('Blog/AddBlog',{
                CategoryData
            });
        }
        else{
            console.log("Data Not Found");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log("Something Is Wrong Please Try Again");
        return res.redirect('back');
    }
}

module.exports.insertBlog = async (req,res)=>{
    try{
        const insertBlog = await Blog.create(req.body);
        if(insertBlog){
            console.log("Insert Data Successfully");
            return res.redirect('/blog/viewBlog');
        }else{
            console.log("Data Are Not Inserted");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log("Something Is Wrong Please Try Again...😒",err);
        return res.redirect('back');
    }
}

module.exports.viewBlog = async (req,res)=>{
    try{

        // Searching
        var search = '';
        if(req.query.blogSearch){
            search = req.query.blogSearch;
        }


        // Pagination 

        var perPage = 3;
        var page = 0;
        if(req.query.page){
            page = req.query.page;
        }

        var viewAllBlogs = await Blog.find({
           $or : [
                {title : {$regex : search,$options:'i'}},
                {description : {$regex : search,$options:'i'}}
           ]
        }).skip(perPage*page).limit(perPage).populate('categoryId').exec();

        var totalRecord = await Blog.find({
           $or : [
                {title : {$regex : search,$options:'i'}},
                {description : {$regex : search,$options:'i'}}
           ]
        }).countDocuments();
        var totalData = Math.ceil(totalRecord/perPage);
        
            if(viewAllBlogs){
                res.render('Blog/ViewBlog',{
                    viewAllBlogs,
                    search,
                    totalData,
                    page,
                });
            }
            else{
                console.log("Data Not Found Please Try Again");
                res.redirect('back');
            }
    }
    catch(err){
        console.log("Something Is Wrong Please Try Again...😒",err);
        res.redirect('back');
    }
}

module.exports.deleteBlog = async (req,res)=>{
    try{
        let id = req.params.id;
        let deleteRecord = await Blog.findByIdAndDelete(id);
        if(deleteRecord){
            console.log("Record Deleted Successfully...😉");
            res.redirect('back');
        }
        else{
            console.log("Something is Wrong Please Try Again..😊");
        }
    }
    catch(err){
        console.log("Something is Wrong Please Try Again...😒");
        return res.redirect('back');
    }
}

module.exports.updateBlog = async (req,res)=>{
    try{
        let id = req.query.updateId;
        let singleBlog = await Blog.findById(id);
        const allCategory = await category.find();
        if(singleBlog){
            return res.render('Blog/EditBlog',{
                singleBlog,allCategory
            });
        }
        else{
            console.log("Something Is Wrong");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log("Something is Wrong Please Try Again...😒");
        return res.redirect('back');
    }
}

module.exports.EditData = async (req,res)=>{
    try{
        let updatedData = await Blog.findByIdAndUpdate(req.body.editId,req.body);
        if(updatedData){
            console.log("Record Updated successfully...😉");
            return res.redirect('/blog/viewBlog');
        }
        else{
            console.log("Record Not Updated Please Try Again");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log("Something is Wrong Please Try Again...😒");
        return res.redirect('back');
    }
}