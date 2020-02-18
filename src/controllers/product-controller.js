'use strict'

const repository = require('../repositories/product-repository');
const productValidator = require('../requests/product-store');
const uploadService = require('../services/upload-service');
const guid = require('guid');
exports.get = async (req, res, next) => {

    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição' });
    }
}

exports.getBySlug = async (req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição' });
    }

}

exports.getByTag = async (req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tag);
        if (data == null) {
            res.status(404).send({ message: 'Registro não encontrado' });
            return;
        }
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição' });
    }
}

exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);

        if (data == null) {
            res.status(404).send({ message: 'Registro não encontrado' });
            return;
        }
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição' });
    }
}

exports.post = async (req, res, next) => {

    try {
        let validator = productValidator.validate(req.body);

        if (!validator.isValid()) {
            res.status(400).send(validator.errors()).end();
            return;
        }
        let filename = await uploadService.upload(req.body.image, guid.raw().substring(0, 8));

        await repository.create({
            title: req.body.title,
            slug: req.body.slug,
            subscription: req.body.subscription,
            price: req.body.price,
            tags: req.body.tags,
            image: filename
        });

        res.status(200).send({ message: 'Produto cadastrado com sucesso!' });
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição', error: e });
    }
}

exports.put = async (req, res, next) => {
    try {
        let validator = productValidator.validate(req.body);
        if (!validator.isValid()) {
            res.status(400).send(validator.errors()).end();
            return;
        }

        await repository.update(req.body);
        res.status(200).send({ message: 'Produto atualizado com sucesso!' });

    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição' });
    }
}

exports.delete = async (req, res, next) => {
    try {
        await repository.destroy(req.body.id);
        res.status(200).send({
            message: 'Produto removido com sucesso!s'
        });
    } catch (e) {
        res.status(500).send({ message: 'Falha ao remover o produto', data: e });
    }
}
