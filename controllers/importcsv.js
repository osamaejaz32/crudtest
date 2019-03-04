const  express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const storage = multer.diskStorage({
    destination: './csv/',
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)
  
        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
})
var upload = multer({ storage: storage })
const router = express.Router();
const csv = require("csvtojson");
const { Question } = require('../models/csv');
const uniqueQuestion = require('../managers/uniqueQestion');
router.get('/',(req,res,next)=>{
    res.send(`<form action="add-csv" method="POST" enctype="multipart/form-data">
        <input type="file" name="avatar" />
        <input type="submit" value="SUBMIT">
    </form>`)
})

router.post('/add-csv',upload.single('question'),(req,res,next)=>{
    // console.log(req.file.path)
    const csvFilePath = req.file.path;
    csv().fromFile(csvFilePath).then((jsonObj)=>{
        for(var i=0;i<jsonObj.length;i++){
            var question = new Question({
                question: jsonObj[i].question,
                option1: jsonObj[i].option1,
                option2: jsonObj[i].option2,
                option3: jsonObj[i].option3,
                option4: jsonObj[i].option4,
                selected: 0
            })
            question.save((err,docs)=>{
                if(!err){
                    console.log(docs)
                    let data = {
                        status: 1,
                        question: docs
                    }
                }
            })
        }
        res.send(jsonObj)
    })
})

router.get('/getQuestion',(req,res,next)=>{
    let response;
    Question.find({selected: 0},(err,docs)=>{
        // response = uniqueQuestion.selectQuestion(docs)
        let data = {
            status: 1,
            question: docs
        };
        res.send(data)
    })
})
module.exports = router;