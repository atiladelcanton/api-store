'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = (req, res, next) => {
    Product.find({ active: true }, 'title price slug').then(data => {
        res.status(200).send({ total: data.length, data: data });
    }).catch(e => {
        res.status(500).send({ message: 'Falha ao cadastrar o produto', data: e });
    });
}

exports.getBySlug = (req, res, next) => {
    Product.findOne({
        slug: req.params.slug,
        active: true
    }, 'title  subscription price slug tags').then(data => {
        if (data == null) {
            res.status(404).send({ message: 'Registro não encontrado' });
        } else {
            res.status(200).send(data);
        }

    }).catch(e => {
        res.status(500).send({ message: 'Falha ao cadastrar o produto', data: e });
    });
}

exports.getByTag = (req, res, next) => {
    Product.find({
        tags: req.params.tag,
        active: true
    }, 'title  subscription price slug tags').then(data => {

        if (data.length == 0) {
            res.status(404).send({ message: 'Registro não encontrado' });
        } else {
            res.status(200).send(data);
        }

    }).catch(e => {
        res.status(500).send({ message: 'Falha ao cadastrar o produto', data: e });
    });
}

exports.getById = (req, res, next) => {
    Product.findById(req.params.id).then(data => {
        if (data == null) {
            res.status(404).send({ message: 'Registro não encontrado' });
        } else {
            res.status(200).send(data);
        }

    }).catch(e => {
        res.status(500).send({ message: 'Falha ao cadastrar o produto', data: e });
    });
}

exports.post = (req, res, next) => {
    let product = new Product(req.body);
    product.save().then(data => {
        res.status(201).send({ message: 'Produto cadastrado com sucesso!' });
    }).catch(e => {
        res.status(400).send({ message: 'Falha ao cadastrar o produto', data: e });
    });

}

exports.put = (req, res, next) => {

    Product.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            subscription: req.body.subscription,
            price: req.body.price,
            slug: req.body.slug
        }
    }).then(product => {
        res.status(200).send({
            message: 'Produto atualizado com sucesso!'
        });
    }).catch(e => {
        res.status(400).send({ message: 'Falha ao cadastrar o produto', data: e });
    });
}

exports.delete = (req, res, next) => {
    Product.findOneAndDelete(req.body.id).then(product => {
        res.status(200).send({
            message: 'Produto removido com sucesso!'
        });
    }).catch(e => {
        res.status(400).send({ message: 'Falha ao remover o produto', data: e });
    });
}