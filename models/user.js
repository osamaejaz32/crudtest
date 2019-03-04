const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const User = mongoose.model('User',{
    user_name:{type: String,required: true},
    user_mobile:{type:String},
    user_email:{type: String},
    device_token:{type: String},
    user_password:{type: String,required: true},
    user_profile_image:{type: String}
})

module.exports = { User }