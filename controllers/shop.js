const Product = require('../models/product');
const Order = require('../models/order');

const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/product-list', {
        products: products,
        pageTitle: 'Products list',
        path: '/products',
      });
    })
    .catch(err => {throw err});
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-details', {
        product: product,
        pageTitle: 'Product',
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        products: products,
        pageTitle: 'Shop',
        path: '/',
      });
    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Cart',
        products: user.cart.items
      });
    })
    .catch(err => console.log(err))


  /* Redundant: FS CRUD operations */
  // Cart.getCart(cart => {
  //   Product.fetchAll(products => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cardProductData = cart.products.find(el => el.id === product.id);
  //       if (cardProductData) {
  //         cartProducts.push({productData: product, qty: cardProductData.qty});
  //       }
  //     }
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Cart',
  //       products: cartProducts
  //     });
  //   });
  // });

};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      res.redirect('/cart');
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err))

  // Product.findById(prodId, product => {
  //   Cart.deleteProduct(prodId, product.price);
  //   res.redirect('/cart');
  // });
};

exports.postOrder = (req, res, next) => {
  req.user.populate('cart.items.productId')
  .execPopulate()
  .then(user => {
    const products = user.cart.items.map(el => {
      return {quantity: el.quantity, product: {...el.productId._doc}};
    });
    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user
      },
      products: products
    });
    return order.save();
  })
  .then(result => {
    return req.user.clearCart();
  })
  .then(result => {res.redirect('/orders');})
  .catch(err => console.log(err));
}

exports.getOrders = (req, res, next) => {
  Order.find({'user.userId': req.user._id})
    .then(orders => {
      res.render('shop/orders', {
        pageTitle: 'Order',
        path: '/orders',
        orders: orders
      });
    })
};


exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
  });
};