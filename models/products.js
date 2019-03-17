const db = require('../db');

const getProductKey = ( id ) => `products.${id}`;

module.exports = {
    getAll() {
      return Object.values(db.get('products'));
    },
    getById(id) {
      return db.get(`products.${id}`);
    },
    add(product) {
      let products = db.get('products');
      let sortedIds = Object.keys(products).sort().reverse();
      let id = sortedIds[0] || 0;
      product.id = Number(id) + 1;
      const keyName = getProductKey(product.id);
      db.set(keyName, product);
      return product;
    },
    delete(id, returnOriginal){
      let product = returnOriginal && this.getById(id);
      const keyName = getProductKey(id);
      db.del(keyName);
      return product;
    },
    patch(id, productUpdate) {
      const product = this.getById(id);
      Object.assign(product, productUpdate);
      const key = getProductKey(id);
      db.set(key, product);
      return product;
    }
  }
