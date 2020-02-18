'use strict';

const ValidatorContract = require('../validators/fluent-validator');

exports.validate = (body) => {
    let contract = new ValidatorContract();

    contract.isRequired(body.product, 'Informe o producto');


    return contract;
}