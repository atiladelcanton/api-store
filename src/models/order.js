'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    order_number: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true,
        enum: ['created', 'done'],
        default: 'created'
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                require: true,
                default: 1,
            },
            price: {
                type: Number,
                required: true,
            }
        }
    ]
});

module.exports = mongoose.model('Order', schema);