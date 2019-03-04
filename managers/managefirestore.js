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
        var addDoc = db.collection('cities').add({
            name: 'Tokyo',
            country: 'Japan'
          }).then(ref => {
            console.log('Added document with ID: ', ref.id);
          });
        // Question.find((err,docs)=>{
        //     if(!err){
        //         console.log(docs[0]);
        //         var setQuestion = db.collection('question').add({
        //             question: docs[0].question,
        //             option1: docs[0].option1,
        //             option2: docs[0].option2,
        //             option3: docs[0].option3,
        //             option4: docs[0].option4,
        //         }).then(ref=>{
        //             console.log('added',ref);
        //         })
        //     }
        // }).limit(1);
    }
    firestore.manageQuestion = function(){

    }
})(module.exports)