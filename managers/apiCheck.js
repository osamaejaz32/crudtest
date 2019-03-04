(function(apiCheck){
    const mongoose = require('mongoose');
    const _ = require('underscore');
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const { User } = require('../models/user');

    
    apiCheck.checkMobileFields = function(user_mobile){
        User.find({user_mobile: user_mobile},(err,docs)=>{
            if(!err){
                if(docs.length > 0){
                    console.log('docs',docs)
                    result = false;
                    return result;
                }
                else{
                    result = true;
                    return result;
                } 
                    
            }
        })
    }
    apiCheck.encryptPassword = function(password){
        let result = password;
        bcrypt.hash(password,saltRounds,function(err,hash){
            if(!err){
                console.log(hash)
                result = hash;
            }
        })
        return result;
    }
})(module.exports)