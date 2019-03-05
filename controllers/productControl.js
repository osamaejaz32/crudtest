const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const api = require('../managers/apiCheck')
const mailer = require('../managers/mailer')
const notification = require('../managers/notification')
// var storage = multer.diskStorage({
//     destination: './uploads/',  
//     filename: (req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
//     }
//  });
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)
  
        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
})
var upload = multer({ storage: storage })
const router = express.Router();
const { Product } = require('../models/prodcut')
const ObjectId = mongoose.Types.ObjectId;

router.get('/',(req,res,next)=>{
    res.status(200).send(`
    <form action="product/add-product" method="POST" enctype="multipart/form-data">
        <input type="text" name="name"><br/>
        <input type="number" name="price"><br/>
        <textarea name="description"></textarea><br/>
        <input type="file" name="avatar" />
        <input type="submit" value="SUBMIT">
    </form>
    `)
})

router.post('/add-product',upload.single('avatar'),(req,res,next)=>{
    
    var filename;
    if(req.file === undefined)
    filename = '';
    else
    filename = req.file.filename
    if(ObjectId.isValid(req.body.id)){
        if(filename == ''){
            product = {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description
            };
        }
        else{
            product = {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                filename: filename
            };
        }
        
        Product.findByIdAndUpdate(req.body.id,{$set: product }, {new: true},(err,docs)=>{
            if(!err){
                res.send(docs)
            }
        })
    }
    else{
        var product = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            filename: filename
        })
        product.save((err,docs)=>{
            if(!err){
                // res.redirect('show-product')
                res.send(docs)
            }
        })
    }
})

router.get('/show-product',(req,res,next)=>{
    mailer.sendMail();
    Product.find((err,docs)=>{
        if(!err){
            for(var i=0;i<docs.length;i++){
                docs[i].filename = 'http://localhost:3000/uploads/'+docs[i].filename;
            }
            res.send(docs)
        }
    }).sort({_id: -1})
})

router.get('/show-product/:id',(req,res,next)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('No matching data fonud')
    }
    else{
        Product.findById(req.params.id,(err,docs)=>{
            if(!err){
                docs.filename = 'http://localhost:3000/uploads/'+docs.filename;
                res.status(200).send(docs)
            }
        })
    }
})

router.get('/edit-product/:id',(req,res,next)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('No matching data fonud')
    }
    else{
        Product.findById(req.params.id,(err,docs)=>{
            if(!err){
                res.status(200).send(`
                <form action="/product/update-product" method="POST" enctype="multipart/form-data">
                    <input type="text" name="name" value="`+docs.name+`"><br/>
                    <input type="hidden" name="id" value="`+req.params.id+`"><br/>
                    <input type="number" name="price" value="`+docs.price+`"><br/>
                    <textarea name="description">`+docs.description+`</textarea><br/>
                    <input type="file" name="avatar" />
                    <input type="submit" value="SUBMIT">
                </form>
                `)
            }
        })
    }
})

router.post('/update-product',upload.single('avatar'),(req,res,next)=>{
    var product;
    if(!ObjectId.isValid(req.body.id)){
        res.status(400).status('No data found')
    }
    else{
        if(req.file === undefined){
            product = {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description
            };
        }
        else{
            product = {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                filename: req.file.filename
            };
        }
        Product.findByIdAndUpdate(req.body.id,{$set: product }, {new: true},(err,docs)=>{
            if(!err){
                res.send(docs)
            }
        })
    }
    // res.redirect('/show-product')
})
router.get('/delete-product/:id',(req,res,next)=>{
 if(!ObjectId.isValid(req.params.id)){
    res.status(400).status('No data found')
 }
 else{
     Product.findByIdAndDelete(req.params.id,(err,docs)=>{
         if(!err){
             res.redirect('/product/show-product')
         }
     })
 }
})

module.exports = router;