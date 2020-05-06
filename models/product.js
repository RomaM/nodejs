const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const prodsList = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProdsFromFile = cb => {
  fs.readFile(prodsList, (err, fileContent) => {
    if (err) {
      console.log('[Model: Product] => getProdsFromFile');
      console.log(err);
      return cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageURL, description, price) {
    this.id = id;
    this.title = title;
    this.imageURL = imageURL;
    this.description = description;
    this.price = price;
  }

  save() {
    getProdsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(el => el.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(prodsList, JSON.stringify(updatedProducts), err => {
          if (err) {console.log(err);}
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(prodsList, JSON.stringify(products), err => {
          if (err) {console.log(err);}
        });
      }
    });
  }

  static delete(id) {
    if (id) {
      getProdsFromFile(products => {
        const productIndex = products.findIndex(el => {
          return el.id === id
        });
        const updatedProducts = [...products];
        updatedProducts.splice(productIndex, 1);

        fs.writeFile(prodsList, JSON.stringify(updatedProducts), err => {
          if (!err) {
            Cart.deleteProduct(id, products[productIndex].price);
          } else {
            console.log(err);
          }
        });
      });
    }
  }

  static fetchAll(cb) {
    getProdsFromFile(cb);
  }

  static findById(id, cb) {
    getProdsFromFile(products => {
      cb(products.find(el => el.id === id));
    });
  }
};