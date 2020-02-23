const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
    next();
});

app.use('/add-product', (req, res, next) => {
    console.log('In the middleware2');
    res.send('<h1>Add Product</h1>');
});

app.use('/', (req, res, next) => {
    console.log('In the middleware2');
    res.send('<h1>Title</h1>');
});


app.listen(3000);