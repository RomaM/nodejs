const express = require('express');

const exphbs = require('express-handlebars');

const notFoundCtrl = require('./controllers/not-found');

const path = require('path');

const mongoConnect = require('./util/database').mongoConnect;

const mongoose = require('mongoose');

const User = require('./models/user');

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

app.use((req, res, next) => {
  User.findById('5eb92075c36c416fa4de30c1')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err))
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(notFoundCtrl);

mongoose.connect('mongodb+srv://roma:Y_WMbX.m8eYwP6_@cluster0-wyoy2.mongodb.net/shop?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(result => {
    User.findOne().then(user => {
      if(!user) {
        const newUser = new User({
          name: 'Max',
          email: 'admin@mail.em',
          cart: {
            items: []
          }
        });
        newUser.save();
      }
    });

    app.listen(3000);
  })
  .catch(err => {console.log(err)});
