const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
  constructor(title,price,description,imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  //method to save this object
  save() {
    const db = getDb();
    return db.collection('products')
      .insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(err=> {
        console.log(err);
      });
  }

  // static method to findall products
  static fetchAll() {
    const db = getDb();
    return db.collection('products')
      .find()
      .toArray()
      .then(products=>{
        console.log(products);
        return products
      })
      .catch(err=>{
        console.log(err);
      });
  }

  // static method to find a single product
  static findByPk(prodId) {
    const db = getDb();
    return db.collection('products')
      .find({_id: new mongodb.ObjectId(prodId) })
      .next()
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(err=> {
        console.log(err);
      });
  }
}


module.exports = Product;