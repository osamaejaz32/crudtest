(function(firestore){
    const admin = require('firebase-admin');
    const serviceAccount = require('./serviceAccountKey.json');

    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://quizac-afd80.firebaseio.com"
    });

    const db = admin.firestore();
    const { Question } = require('../models/csv');
    firestore.getQuestion = function(){
        Question.find({selected: 0},(err,docs)=>{
            if(!err){
                if(docs.length > 0){
                    var options = [
                        {option:docs[0].option1,valid: true},
                        {option:docs[0].option2,valid: false},
                        {option:docs[0].option3,valid: false},
                        {option:docs[0].option4,valid: false},
                    ];
                    options.sort(() => Math.random() - 0.5);
                    var setQuestion = db.collection('question').doc('1').set({
                        question: docs[0].question,
                        options: options
                    }).then(ref=>{
                        console.log('added');
                        var question = {
                            selected: 1
                        };
                        Question.findByIdAndUpdate(docs[0]._id,{$set: question},{new: true},(err,doc)=>{
                            if(!err){
                                console.log('updated',doc);
                            }
                        })
                    })
                }
                else{
                    var setQuestion = db.collection('question').doc('1').set({
                        question: null,
                        status: false
                    }).then(ref=>{
                        console.log('the end');
                    }) 
                }
            }
        }).limit(1);
    }
    firestore.manageQuestion = function(){

    }
})(module.exports)