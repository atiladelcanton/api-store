'use strict';

const ValidatorContract = require('../validators/fluent-validator');

exports.validate = (body) => {
    let contract = new ValidatorContract();

    contract.hasMinLen(body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(body.slug, 3, 'O Slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(body.subscription, 3, 'O Descricao deve conter pelo menos 3 caracteres');

    return contract;
}