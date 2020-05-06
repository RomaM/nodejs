const express = require('express');

const path = require('path');

const adminCtrl = require('../controllers/admin');

const router = express.Router();

router.get('/add-product', adminCtrl.getAddProduct);

router.get('/products', adminCtrl.getProducts);

router.post('/add-product', adminCtrl.postAddProduct);

router.get('/edit-product/:productId', adminCtrl.getEditProduct);

router.post('/edit-product', adminCtrl.postEditProduct);

router.post('/delete-product', adminCtrl.postDeleteProduct);

module.exports = router;
