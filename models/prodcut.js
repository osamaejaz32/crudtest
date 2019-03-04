const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const Product = mongoose.model('Product',{
    name: String,
    price: Number,
    description: String,
    filename: String
})

module.exports = { Product }