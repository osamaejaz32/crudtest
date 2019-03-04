const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;
const { User } = require('../models/user');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const apiCheck = require('../managers/apiCheck');
const storage = multer.diskStorage({
    destination: './profilePics/',
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)
  
        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
})
var upload = multer({ storage: storage })

router.get('/',(req,res,next)=>{
    res.send('configured')
})
router.post('/saveUserProfile',upload.single('avatar'),(req,res,next)=>{
    var filename;
    let result = apiCheck.checkMobileFields(req.body.user_mobile);
    console.log(result)
    if(req.file === undefined){
        filename = '';
    }
    else{
        filename = req.file.filename;
    }

        var user = new User({
        user_name:req.body.user_name,
        user_mobile:req.body.user_mobile,
        user_email:req.body.user_email,
        device_token:req.body.device_token,
        user_profile_image:filename,
        user_password:apiCheck.encryptPassword(req.body.user_password)
    })
    if(result){
        user.save((err,docs)=>{
            if(!err){
                let response = {
                    status: true,
                    data: docs[0]
                }
                res.send(response);
            }
            else{
                let response = {
                    status: true,
                    data: null
                }
                res.send(response); 
            }
        })
    }
    else if(!result){
        let response = {
            status: true,
            data: {
                msg: 'Mobile No. Already exists'
            }
        }
        res.send(response); 
    }
})

router.post('/loginUser',(req,res,next)=>{
    User.find({user_mobile: req.body.user_mobile,user_password: req.body.user_password},(err,docs)=>{
        if(!err){
            if(docs.length > 0){
                let respnose = {
                    status: true,
                    data: docs[0]
                }
                res.send(respnose)
            }
            else{
                let respnose = {
                    status: false,
                    data: null
                }
                res.send(respnose)
            }
        }
        else{
            let respnose = {
                status: false,
                data: null
            }
            res.status(400).send(respnose); 
        }
    })
})

module.exports = router;