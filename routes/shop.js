const express = require('express');

const shopCtrl = require('../controllers/shop');
const router = express.Router();

const adminData = require('./admin');

router.get('/', shopCtrl.getIndex);

router.get('/products', shopCtrl.getProducts);

router.get('/products/:productId', shopCtrl.getProduct);

router.get('/cart', shopCtrl.getCart);

router.post('/cart', shopCtrl.postCart);

router.get('/orders', shopCtrl.getOrders);

router.get('/checkout', shopCtrl.getCheckout);

router.post('/cart-delete-action', shopCtrl.postDeleteProduct);

module.exports = router;