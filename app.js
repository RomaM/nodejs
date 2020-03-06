const express = require('express');

const exphbs = require('express-handlebars');

const path = require('path');

const app = express();

app.engine('hbs', exphbs({
  extname: "hbs",
  defaultLayout: "",
  // layoutsDir: "",
}));
app.set('view engine', 'hbs');

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
  res.status(404).render('404', {pageTitle: '404'});
  // .sendFile(path.join(__dirname, 'views', '404.html'));

});

app.listen(3000);