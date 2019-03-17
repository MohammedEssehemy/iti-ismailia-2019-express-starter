const store = require('../db');
const getCategoryKey = ( id ) => `categories.${id}`;

module.exports = {
    getAll() {
      return Object.values(store.get('categories'));
    },
    getById(id) {
      return store.get(`categories.${id}`);
    },
    add(category) {
      const keyName = getCategoryKey(category.id);
      if(store.hasOwn(keyName)) throw new Error('id already exists');
      return store.set(keyName, category);
    },
    delete(id){
      const keyName = getCategoryKey(id);
      return store.del(keyName);
    },
    patch(id, categoryUpdate) {
      const category = this.getById(id);
      Object.assign(category, categoryUpdate);
      const key = getCategoryKey(id);
      return store.set(key, category);
    }
  }
