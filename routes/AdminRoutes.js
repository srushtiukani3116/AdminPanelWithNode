const AddModel = require('../models/AdminModel');
const express = require('express');
const passport = require('passport');

const routes = express.Router();

const AdminClt = require('../controllers/AdminController');

// Login start

routes.get('/' , AdminClt.Login);

routes.post('/CheckLogin' , passport.authenticate('local', {failureRedirect : '/'}) ,AdminClt.CheckLogin);

routes.get('/logout' , AdminClt.logout);

routes.get('/Myprofile',passport.checkAuthUser , AdminClt.Myprofile);

routes.get('/ChangePassword',passport.checkAuthUser , AdminClt.ChangePassword);

routes.post('/CheckPass' , AdminClt.CheckPass);

// End Login 
routes.get('/dashbord' ,passport.checkAuthUser, AdminClt.dashbord);

routes.get('/AddData',passport.checkAuthUser , AdminClt.AddData);

routes.post('/AddAdminData' , AddModel.uploadImageFile , AdminClt.AddAdminData);

routes.get('/ViewData' ,passport.checkAuthUser, AdminClt.ViewData);

routes.get('/deleteData/:id' , AdminClt.deleteData);

routes.get('/updateData',passport.checkAuthUser, AdminClt.updateData);

routes.post('/EditData' , AddModel.uploadImageFile ,AdminClt.EditData);

// Forgot Password 

routes.get('/emailverify' , AdminClt.emailverify);

routes.post('/checkemailverify' , AdminClt.checkemailverify);

routes.get('/checkOtp' ,passport.checkAuthUser, AdminClt.checkOtp);

routes.post('/checkVerifyOtp' , AdminClt.checkVerifyOtp);

routes.get('/forgotPass' ,passport.checkAuthUser, AdminClt.forgotPass);

routes.post('/forgotPassVerify' , AdminClt.forgotPassVerify);

routes.use('/blog',require('./BlogRoutes'));

routes.use('/category' , require('./CategoryRoutes'));

// End Forgot Password 

module.exports = routes;