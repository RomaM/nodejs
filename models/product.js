const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);


/* Redundant: MongoDB driver */
// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;
//
// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userid = userId;
//   }
//
//   save() {
//     const db = getDb();
//     let dbOp;
//     if(this._id) {
//       dbOp = db.collection('products').updateOne(
//         {_id: this._id},
//         {$set: this}
//       );
//     } else {
//       dbOp = db.collection('products').insertOne(this);
//     }
//     return dbOp
//     .then(result => result)
//     .catch(err => console.log(err));
//   }
//
//   static fetchAll() {
//     const db = getDb();
//     return db.collection('products').find().toArray()
//       .then(products => products)
//       .catch(err => {throw err});
//   }
//
//   static findById(prodId) {
//     const db = getDb();
//     return db.collection('products')
//       .find({_id: new mongodb.ObjectId(prodId)})
//       .next()
//       .then(product => product)
//       .catch(err => {throw err});
//   }
//
//   static deleteById(prodId) {
//     const db = getDb();
//     return db.collection('products')
//       .deleteOne({_id: new mongodb.ObjectId(prodId)})
//       .then(result => result)
//       .catch(err => {throw err});
//   }
// }
//
// module.exports = Product;

/* Redundant: FS CRUD operations */
// const fs = require('fs');
// const path = require('path');
//
// const Cart = require('./cart');

// const prodsList = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'products.json'
// );

// const getProdsFromFile = cb => {
//   fs.readFile(prodsList, (err, fileContent) => {
//     if (err) {
//       console.log('[Model: Product] => getProdsFromFile');
//       console.log(err);
//       return cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }
//
//   save() {
//     getProdsFromFile(products => {
//       if (this.id) {
//         const existingProductIndex = products.findIndex(el => el.id === this.id);
//         const updatedProducts = [...products];
//         updatedProducts[existingProductIndex] = this;
//         fs.writeFile(prodsList, JSON.stringify(updatedProducts), err => {
//           if (err) {console.log(err);}
//         });
//       } else {
//         this.id = Math.random().toString();
//         products.push(this);
//         fs.writeFile(prodsList, JSON.stringify(products), err => {
//           if (err) {console.log(err);}
//         });
//       }
//     });
//   }
//
//   static delete(id) {
//     if (id) {
//       getProdsFromFile(products => {
//         const productIndex = products.findIndex(el => {
//           return el.id === id
//         });
//         const updatedProducts = [...products];
//         updatedProducts.splice(productIndex, 1);
//
//         fs.writeFile(prodsList, JSON.stringify(updatedProducts), err => {
//           if (!err) {
//             Cart.deleteProduct(id, products[productIndex].price);
//           } else {
//             console.log(err);
//           }
//         });
//       });
//     }
//   }
//
//   static fetchAll(cb) {
//     getProdsFromFile(cb);
//   }
//
//   static findById(id, cb) {
//     getProdsFromFile(products => {
//       cb(products.find(el => el.id === id));
//     });
//   }
// };