const express = require('express');
const mongooose = require('mongoose');
const firestore = require('../managers/managefirestore');
const router = express.Router();

router.get('/',(req,res,next)=>{
    // setInterval(()=>{
        firestore.getQuestion();
        // res.send(response);
    // },10000);
})
module.exports = router;