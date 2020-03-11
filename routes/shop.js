const express = require('express');

const productsCtrl = require('../controllers/products');
const router = express.Router();

const adminData = require('./admin');

router.get('/', productsCtrl.getProducts);

module.exports = router;