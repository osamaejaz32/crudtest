const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const Question = mongoose.model('Question',{
    question: String,
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    selected: Number,
    module_no: Number
})

module.exports = { Question }