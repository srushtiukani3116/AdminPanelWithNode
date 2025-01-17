const express = require('express');
const routes = express.Router();
const BlogClt = require('../controllers/BlogConroller');
const passport = require('passport');

routes.get('/', passport.checkAuthUser,BlogClt.AddBlog);

routes.post('/insertBlog' ,BlogClt.insertBlog);

routes.get('/viewBlog' , passport.checkAuthUser, BlogClt.viewBlog);

routes.get('/deleteBlog/:id' ,BlogClt.deleteBlog);

routes.get('/updateBlog',BlogClt.updateBlog);

routes.post('/EditData',passport.checkAuthUser,BlogClt.EditData);

module.exports = routes;