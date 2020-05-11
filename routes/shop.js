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

router.post('/orders', shopCtrl.postOrder);

router.post('/cart-delete-item', shopCtrl.postCartDeleteProduct);

module.exports = router;