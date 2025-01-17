const express = require('express');
const port = 8002;
const path = require('path');
const app = express();
const db = require('./config/mongoose');
const cookieParse = require('cookie-parser');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('./config/PassportLocal');

app.set('view engine','ejs');
app.set('views' , path.join(__dirname , 'views'));

app.use(express.urlencoded());
app.use(cookieParse());
app.use(express.static(path.join(__dirname,'assets')));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use(session({
    name : 'Rnw',
    secret : 'RnwKey',
    resave : false,
    saveUninitialized : false,
    cookie : {
        maxAge : 1000*60*60
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthUser);

app.use('/' , require('./routes/AdminRoutes'));

app.listen(port,(err)=>{
    if(err){
        console.log("Something is Wrong",err);
        return false;
    }
    console.log("Server Connected Successfully",port);
});