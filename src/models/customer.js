'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: [{
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    }],
}, { timestamps: true });

module.exports = mongoose.model('Customer', schema);