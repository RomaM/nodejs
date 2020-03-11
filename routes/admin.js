const express = require('express');

const path = require('path');

const productsCtrl = require('../controllers/products');

const router = express.Router();

// /admin/add-product GET
router.get('/add-product', productsCtrl.getAddProduct);

// /admin/add-product POST
router.post('/add-product', productsCtrl.postAddProduct);

module.exports = router;