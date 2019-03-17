const Store = require('data-store');
const db = new Store({ path: '.config/store.json' });

module.exports = db;
