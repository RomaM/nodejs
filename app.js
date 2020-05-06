const express = require('express');

const exphbs = require('express-handlebars');

const notFoundCtrl = require('./controllers/not-found');

const path = require('path');

const mongoConnect = require('./util/database');

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

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(notFoundCtrl);

mongoConnect((client) => {
  app.listen(3000);
});