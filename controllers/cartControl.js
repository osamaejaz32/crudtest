const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Cart } = require('../models/cart');
const { Product } = require('../models/prodcut');
const ObjectId = mongoose.Types.ObjectId;
const response = {
    msg: any,
    data: any,
    status: any
};
router.get('/:user_id',(req,res,next)=>{
    if(ObjectId.isValid(req.params.user_id)){
        Cart.find({user_id: req.params.user_id},(err,docs)=>{
            if(!err){
                if(docs.length > 1){
                    response.msg = '';
                    response.data = docs;
                    response.status = 1;
                }
            }
            else{
                response.status = 0;
            }
        })
    }
    res.send(response)
})