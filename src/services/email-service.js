'use strict'

const config = require('../config');
const sendgrid = require('sendgrid')(config.sendgridKey);

exports.send = async (to, subject, body) => {
    sendgrid.send({
        to: to,
        from: 'atila.rampazo@zencompany.com.br',
        subject: subject,
        html: body
    });
}