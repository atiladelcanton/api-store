'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true,
    },
    slug: {
        type: String,
        required: [true, 'O slug é obrigatório'],
        trim: true,
        index: true,
        unique: true,
    },
    subscription: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    active: {
        type: Boolean,
        require: true,
        default: true
    },
    tags: [{
        type: String,
        required: true
    }]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);