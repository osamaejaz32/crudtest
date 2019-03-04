const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const notification = require('../managers/notification');
const mailer = require('../managers/mailer');

router.get('/sendNotification',(req,res,err)=>{
    var token = [
        'e4QO0SyyduM:APA91bGzSOhgyzi40MsffI2oDZuj54-jsn_j3NlB2WlhieS4GL_ezWm1qxDCVwWsdyRBu-qjY8Jfy6-t_uhOFrxFXLKup3etor_pEmmQ0s-wfly8aNUFj8BeDDZyb_Wpo_or1BenxK3K','ddddf'
    ];
    var message = {
        title:'Recieved notification from BE',
        body:'Welcome to flyngener'
    }
    notification.notify(token[0],message);
    res.send('Notification sent')
})

router.get('/sendMail',(req,res,next)=>{
    var msg = mailer.sendMail();
    res.send(msg);
})
module.exports = router;