const express = require('express');

const exphbs = require('express-handlebars');

const path = require('path');

const app = express();

//*** express-handlebars engine configuration ***//
// app.engine('hbs', exphbs({
//   extname: "hbs",
//   defaultLayout: "main-layout",
//   layoutsDir: "views/layouts",
// }));
// app.set('view engine', 'hbs');

app.set('view engine', 'ejs');

// Default configuration to setting views folder
//app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// app.use('/', (req, res, next) => {
//     next();
// });

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', {pageTitle: '404', path: '404'});
  // .sendFile(path.join(__dirname, 'views', '404.html'));

});

app.listen(3000);