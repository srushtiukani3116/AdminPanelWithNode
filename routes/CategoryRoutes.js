const express = require('express');
const routes = express.Router();
const categoryClt = require('../controllers/CategoryController');
const passport = require('passport');

routes.get('/' , passport.checkAuthUser, categoryClt.AddCategory);

routes.post('/insertCategory' , categoryClt.insertCategory);

routes.get('/viewCategory' , passport.checkAuthUser, categoryClt.viewCategory);

routes.get('/deleteCategory' ,categoryClt.deleteCategory);

routes.post('/EditCategory' , categoryClt.EditCategory);

module.exports = routes;