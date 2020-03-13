const express = require('express');

const path = require('path');

const adminCtrl = require('../controllers/admin');

const router = express.Router();

router.get('/add-product', adminCtrl.getAddProduct);

router.get('/products', adminCtrl.getProducts);

router.post('/add-product', adminCtrl.postAddProduct);

module.exports = router;
