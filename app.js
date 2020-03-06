const express = require('express');

const path = require('path');

const app = express();

app.set('view engine', 'pug');
//app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// app.use('/', (req, res, next) => {
//     next();
// });

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404)
    .render('404', {pageTitle: '404'});
  // .sendFile(path.join(__dirname, 'views', '404.html'));

});

app.listen(3000);