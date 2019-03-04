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
        // var addDoc = db.collection('cities').add({
        //     name: 'Tokyo',
        //     country: 'Japan'
        //   }).then(ref => {
        //     console.log('Added document with ID: ', ref.id);
        //   });
        Question.find({selected: 0},(err,docs)=>{
            if(!err){
                if(docs.length > 0){
                    console.log(docs[0]);
                    var setQuestion = db.collection('question').doc('1').set({
                        question: docs[0].question,
                        option1: docs[0].option1,
                        option2: docs[0].option2,
                        option3: docs[0].option3,
                        option4: docs[0].option4,
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
            }
        }).limit(1);
    }
    firestore.manageQuestion = function(){

    }
})(module.exports)