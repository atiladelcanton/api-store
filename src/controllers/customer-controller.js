'use strict'

const repository = require('../repositories/customer-repository');
const customerValidator = require('../requests/customer-store');
const md5 = require('md5');
const emailService = require('../services/email-service');

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
        let validator = customerValidator.validate(req.body);

        if (!validator.isValid()) {
            res.status(400).send(validator.errors()).end();
            return;
        }

        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        emailService.send(
            req.body.email,
            'Bem Vindo ao Node Store',
            global.EMAIL_TMPL.replace('{0}', req.body.name)
        );

        res.status(200).send({ message: 'Cliente cadastrado com sucesso!' });
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição', error: e });
    }
}

exports.put = async (req, res, next) => {
    try {
        let validator = customerValidator.validate(req.body);
        if (!validator.isValid()) {
            res.status(400).send(validator.errors()).end();
            return;
        }

        await repository.update(req.body);
        res.status(200).send({ message: 'Cliente atualizado com sucesso!' });

    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição' });
    }
}

exports.delete = async (req, res, next) => {
    try {
        await repository.destroy(req.body.id);
        res.status(200).send({
            message: 'Cliente removido com sucesso!s'
        });
    } catch (e) {
        res.status(500).send({ message: 'Falha ao remover o Cliente', data: e });
    }
}