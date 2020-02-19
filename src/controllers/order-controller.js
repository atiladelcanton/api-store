'use strict'

const repository = require('../repositories/order-repository');
const orderValidator = require('../requests/order-store');
const guid = require('guid');
const authService = require('../services/auth-service');

exports.get = async (req, res, next) => {
    try {

        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição' });
    }
}
exports.post = async (req, res, next) => {

    try {

        const data = await authService.decodeToken(req);
        console.log(data);
        await repository.create({
            customer: data.id,
            order_number: guid.raw().substring(0, 8),
            items: req.body.items
        });
        res.status(200).send({ message: 'Ordem cadastrada com sucesso!' });
    } catch (e) {
        console.log(e)
        res.status(500).send({ message: 'Falha ao processar sua requisição', error: e });
    }
}

exports.delete = async (req, res, next) => {
    try {
        await repository.destroy(req.body.id);
        res.status(200).send({
            message: 'Ordem removido com sucesso!s'
        });
    } catch (e) {
        res.status(500).send({ message: 'Falha ao remover a Ordem', data: e });
    }
}