const category = require('../models/CategoryModel');
const CategoryModel = require('../models/CategoryModel');

module.exports.AddCategory = async (req,res)=>{
    try{ 
        res.render('Category/AddCategory');
    }
    catch(err){
        console.log("Something is wrong Please Try Again...😒");
        return res.redirect('back');
    }
}

module.exports.insertCategory = async(req,res)=>{
    try{
        console.log(req.body);
        let CategoryData = await CategoryModel.create(req.body);
        if(CategoryData){
            console.log("Data Add successfully");
            return res.redirect('back');
        }
        else{
            console.log("Ouery is not Found");
            return res.redirect('back')
        }
    }
    catch(err){
        console.log("Something is wrong Please Try Again...😒");
        return res.redirect('back');
    }
}

module.exports.viewCategory = async(req,res)=>{
    try{

        let search = '';
        if(req.query.categorySearch){
            search = req.query.categorySearch
        }

        let perPage = 2;
        let page = 0;
        if(req.query.page){
            page = req.query.page
        }

        let CategoryData = await CategoryModel.find(
            {categoryName : {$regex : search}}
        ).skip(page*perPage).limit(perPage);

        let totalRecord = await CategoryModel.find(
            {categoryName : {$regex : search}}
        ).countDocuments();

        var totalCategoryData = Math.ceil(totalRecord/perPage);

        if(CategoryData){
            res.render('Category/ViewCategory',{
                CategoryData,
                search,
                page,
                totalCategoryData
            });
        }
        else{
            console.log("Category Is not Found");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log("Something is wrong Please Try Again...😒");
        return res.redirect('back');
    }
}

module.exports.deleteCategory = async(req,res)=>{
    try{
        let id = req.query.deletecategoryId;
        let deleteCategoryData = await category.findByIdAndDelete(id);
        console.log(deleteCategoryData)
        if(deleteCategoryData){
            console.log("Record Deleted Successfully...😉");
            res.redirect('back');
        }
        else{
            console.log("Something is Wrong Please Try Again..😊");
        }
    }
    catch(err){
        console.log("Something Is Wrong Please Try Again...😀")
        return res.redirect('back');
    }
}