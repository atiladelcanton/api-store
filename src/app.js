'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();


mongoose.connect('mongodb://atilarampazo:ztascani1978@ds163681.mlab.com:63681/node_store', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    'useFindAndModify': false
});

const Product = require('./models/product');

// Carrega Rota
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/products-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;