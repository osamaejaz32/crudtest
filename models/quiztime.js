const mongoose = require('mongoose');
const Quiz = mongoose.model('Quiz',{
    module_no: {type: Number,required: true},
    quiz_time: {type: String},
    quiz_date: {type: Date}
})
module.exports = { Quiz };