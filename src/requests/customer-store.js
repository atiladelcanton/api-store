'use strict';

const ValidatorContract = require('../validators/fluent-validator');

exports.validate = (body) => {
    let contract = new ValidatorContract();

    contract.hasMinLen(body.name, 6, 'O Nome deve conter pelo menos 6 caracteres');

    contract.hasMinLen(body.email, 6, 'O E-mail deve conter pelo menos 6 caracteres');
    contract.isEmail(body.email, 'E-mail inválido');

    contract.hasMinLen(body.password, 8, 'A Senha deve conter pelo menos 8 caracteres');

    return contract;
}