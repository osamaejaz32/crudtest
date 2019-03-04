(function(uniqueQuestions){
    const mongoose = require('mongoose');
    const { Question } = require('../models/csv')
    const ObjectId = mongoose.Types.ObjectId;
    uniqueQuestions.selectQuestion = function(data){
        let res = data[1];
        console.log(data[1])
        if(ObjectId.isValid(data[1]._id)){
            console.log('fjfjfk')
            question = {selected: 1};
            Question.findOneAndUpdate(data[1]._id,{$set: question},{new: true},(err,docs)=>{
                if(!err){
                    res = data;
                }
            })
        }
        return res;
    }
})(module.exports)