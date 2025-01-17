const AddModel = require('../models/AdminModel');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

module.exports.dashbord = async (req,res)=>{
    try{
        res.render('Dashbord');
    }
    catch(err){
        console.log("Something Is Wrong Please Try Again",err);
        return res.redirect('back');
    }
}

module.exports.AddData = async (req,res)=>{
    try{
        res.render('AddAdminData');
    }
    catch(err){
        console.log("Something Is Wrong Please Try Again",err);
        return res.redirect('back');
    }
}

module.exports.AddAdminData = async(req,res)=>{
    try{
        console.log(req.file);
        console.log(req.body);
        
        var NewImage = '';
        if(req.file){
            NewImage = AddModel.imgpath+'/'+req.file.filename;
        }
        req.body.image = NewImage;
        req.body.name = req.body.fname+' '+req.body.lname;

        await AddModel.create(req.body);
        return res.redirect('back');
    }
    catch(err){
        console.log("Something Is Wrong Please Try Again",err);
        return res.redirect('back');
    }
}

module.exports.ViewData = async(req,res)=>{
    try{
        var GetData = await AddModel.find();
        return res.render('ViewAdmin',{
            GetData,
        });
    }
    catch(err){
        console.log("Something Is Wrong Please Try Again");
        return res.redirect('back');
    }
}

module.exports.deleteData = async(req,res)=>{
    try{
        let id = req.params.id;
        let deleteAdmin = await AddModel.findById(id);
        if(deleteAdmin){
            try{
                let deleteimage = path.join(__dirname,'..',deleteAdmin.image);
                await fs.unlinkSync(deleteimage);
            }
            catch(err){
                console.log("Something Is Wrong DeleteAdmin not Found");
                return res.redirect('back');
            }
            let deleteRecord = await AddModel.findByIdAndDelete(id);
            if(deleteRecord){
                console.log("Data Deleted Successfully");
                return res.redirect('back')
            }
            else{
                console.log("Data Not Deleted Please Try Again");
                return res.redirect('back');
            }
        }
        else{
            console.log("Record Not Found");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log("Something is Wrong",err);
        return res.redirect('back');
    }
}

module.exports.updateData = async(req,res)=>{
    try{
            let id = req.query.uId;
        let singleAdmin = await AddModel.findById(id);
        if(singleAdmin){
            return res.render('EditAdmin',{
                singleAdmin,
                adminData : req.cookies.adminData
            });
        }
        else{
            console.log("Data is not found");
            res.redirect('back');
        }
       
        
    }
    catch(err){
        console.log("Something is Wrong",err);
        res.redirect('back');
    }
}

module.exports.EditData = async(req,res)=>{
    try{
        let id = req.body.editId;
        let singleAdmin = await AddModel.findById(id);
        req.body.name = req.body.fname+' '+req.body.lname;
        if(req.file){
            try{
                let deletePath = path.join(__dirname,"..",singleAdmin.image);
                await fs.unlinkSync(deletePath);
            }
            catch(err){
                console.log("Image Is Not Found");
            }
            
            var NewImage = AddModel.imgpath+'/'+req.file.filename;
            req.body.image = NewImage;
        }
        else{
            req.body.image = singleAdmin.image;
        }
        let updatedData = await AddModel.findByIdAndUpdate(req.body.editId,req.body);

        if(updatedData){
            let NewAdmin = await AddModel.findById(id);
            let oldAdmin = req.user;

            if(oldAdmin.id === NewAdmin.id){
                return res.redirect('/Myprofile');
            }
            else{
                return res.redirect('/ViewData');
            }
        }
        else{
            console.log("Somethinf IS Wrong");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log("Something is Wrong Please Try Again",err);
        return res.redirect('back');
    }
}

// Login page 
module.exports.Login = async(req,res)=>{
    try{
        return res.render('Login');
    }
    catch(err){
        console.log("Something Is Big Wrong",err);
        return res.redirect('back');
    }
}

module.exports.CheckLogin = async(req,res) =>{
    try{
        return res.redirect('/dashbord');   
    }
    catch(err){
        console.log("Something Is Wrong Please Try Again");
        return res.redirect('back');
    }
}

module.exports.logout = async(req,res)=>{
    try{
        req.session.destroy(function(err){
            if(err){
                return false
            }
            return res.redirect('/');
        })
    }
    catch(err){
        console.log("Something Is Wrong Not worked Logout",err);
        return res.redirect('back')
    }
}

module.exports.Myprofile = async(req,res)=>{
    try{
        return res.render('MyProfile');
    }
    catch(err){
        console.log("Something Is Wrong Please Try Again",err);
        return res.redirect('back');
    }
}

module.exports.ChangePassword = async(req,res)=>{
    try{
        return res.render('ChangePass');
    }
    catch(err){
        console.log("Something Is Wrong Please Try Again",err);
        return res.redirect('back');
    }
}

module.exports.CheckPass = async(req,res)=>{
    try{
        let oldData = req.user;
        if(oldData.password == req.body.currentpassword){
            if(req.body.currentpassword != req.body.newpassword){
                if(req.body.newpassword == req.body.confirmpassword){
                    let editPass = await AddModel.findByIdAndUpdate(oldData._id,{
                        password : req.body.newpassword
                    });
                    return res.redirect('/logout');
                }
                else{
                    console.log("New Password And Confirm Password Are not Same Please Enter Same Password");
                    return res.redirect('back');
                }
            }
            else{
                console.log("Current Password And New Password Are Same Please Enter Diffrent Password");
                return res.redirect('back');
            }
        }
        else{
            console.log("Oops Old And Current Password Are not Match Please Try Again...😒");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log("Something Is Wrong Please Try Again",err);
        return res.redirect('back');
    }
}
// End Login Page 

// forgot Password 
module.exports.emailverify = async(req,res)=>{
    try{
        return res.render('EmailVerify');
    }
    catch(err){
        console.log("Something is Wrong Please Try Again",err);
        return res.redirect('back');
    }
}

module.exports.checkemailverify = async(req,res)=>{
    try{
        let singleObj = await AddModel.find({email:req.body.email}).countDocuments();
        if(singleObj==1){
            let singleUser = await AddModel.findOne({email:req.body.email});
            let OTP = Math.floor(Math.random()*1000000);
            res.cookie('otp',OTP);
            res.cookie('email',singleUser.email);

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for port 465, false for other ports
                auth: {
                  user: "srushtiukani3116@gmail.com",
                  pass: "kwcujevtoutkcwzw",
                },
                tls : {
                    rejectUnauthorized: false 
                } 
              });

              const info = await transporter.sendMail({
                from: 'srushtiukani3116@gmail.com', // sender address
                to: singleUser.email, // list of receivers
                subject: "OTP Verify", // Subject lin, 
                html: `<b>OTP Verify</b> ${OTP}`, // html body
              });

              return res.redirect('/checkOtp');

        }
        else{
            console.log("Invalid Email Please Try Again");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log("Something Is Big Wrong Please Try Again",err);
        return res.redirect('back');
    }
}

module.exports.checkOtp = async(req,res)=>{
    try{
        return res.render('CheckOtp');
    }
    catch(err){
        console.log("Something Is Wrong",err);
        return res.redirect('back');
    }
}

module.exports.checkVerifyOtp = async(req,res)=>{
    try{
        if(req.body.OTP == req.cookies.otp){
            res.clearCookie('otp');
            return res.redirect('/forgotPass');
        }
        else{
            console.log("Invalid OTP Please Enter Valid OTP");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log("Something Is Wrong",err);
        return res.redirect('back');
    }
}

module.exports.forgotPass = async(req,res)=>{
    try{
        return res.render('ForgotPass');
    }
    catch(err){
        console.log("Something Is Wrong",err);
        return res.redirect('back');
    }
}

module.exports.forgotPassVerify = async(req,res)=>{
    try{
        if(req.body.newpassword == req.body.confirmpassword){
            let verifyEmail = await AddModel.find({email : req.cookies.email}).countDocuments();
            if(verifyEmail==1){
                let adminNewData = await AddModel.findOne({email : req.cookies.email});
                let updatePass = await AddModel.findByIdAndUpdate(adminNewData.id,{password : req.body.newpassword});
                if(updatePass){
                    console.log("Password Updated")
                    res.clearCookie('email');
                    return res.redirect('/');
                }
                else{
                    console.log("UpdatePass Not Successfully");
                    return res.redirect('back');
                }
            }
            else{
                console.log("Email Not Found");
                return res.redirect('back');
            }
        }
        else{
            console.log("NewPassword And ConfirmPasswrod Is Not Match Please Try Again");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log("Something Is Wrong",err);
        return res.redirect('back');
    }
}

// End Password