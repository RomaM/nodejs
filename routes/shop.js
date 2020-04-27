const express = require('express');

const shopCtrl = require('../controllers/shop');
const router = express.Router();

const adminData = require('./admin');

router.get('/', shopCtrl.getIndex);

router.get('/products', shopCtrl.getProducts);

router.get('/cart', shopCtrl.getCart);

router.get('/orders', shopCtrl.getOrders);

router.get('/checkout', shopCtrl.getCheckout);

module.exports = router;