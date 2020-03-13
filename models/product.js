const fs = require('fs');
const path = require('path');

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
  constructor(title, imageURL, description, price) {
    this.title = title;
    this.imageURL = imageURL;
    this.description = description;
    this.price = price;
  }

  save() {
    getProdsFromFile(products => {
      products.push(this);

      fs.writeFile(prodsList, JSON.stringify(products), err => {
        if (err) {
          console.log('[Model: Product] => Save Error');
          console.log(err);
        }

        console.log('[Model: Product] => Save');
        console.log(prodsList);
      });
    });
  }

  static fetchAll(cb) {
    getProdsFromFile(cb);
  }
};