const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/crud',(err)=>{
    if(!err){
        console.log('database connected')
    }else{
        console.log('err',err)
    }
})

// mongoose.connect('mongodb+srv://dbOsama:osamaejaz@cluster0-p6lkp.mongodb.net/test?retryWrites=true',(err)=>{
//     if(!err){
//         console.log('database connected')
//     }else{
//         console.log('err',err)
//     }
// })
