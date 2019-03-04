const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/crud',(err)=>{
    if(!err){
        console.log('database connected')
    }else{
        console.log('err',err)
    }
})