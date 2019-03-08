const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const Cart = mongoose.model('Cart',{
    produt_id: {type: ObjectId,required: true},
    user_id: {type: ObjectId,required: true},
    product_quantity: {type: Number},
    product_price: {type: Number},
})

module.exports = { Cart };