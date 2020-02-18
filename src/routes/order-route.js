'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/order-controller');

router.get('/', controller.get);
router.post('/', controller.post);
router.delete('/', controller.delete);

module.exports = router;