const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({title: title, price: price, description: description, imageUrl: imageUrl, userId: req.user._id});
  product.save()
    .then(result => {
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
  /* Redundant: FS CRUD operations */
  // const product = new Product(null, req.body.title, req.body.imageUrl, req.body.description, req.body.price);
  // product.save();
  // res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then(product => {
      if(!product) {
        return res.redirect('/');
      }

      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  Product.findById(prodId).then(product => {
    product.title = title;
    product.price = price;
    product.imageUrl = imageUrl;
    product.description = description;
    return product.save();
  })
  .then(result => {
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));;

};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then(result => result)
    .catch(err => console.log(err))
  res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
  Product.find()
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(products => {
      res.render('admin/products', {
        pageTitle: 'Admin Products',
        path: '/admin/products',
        products: products
      })
    });
};
