const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  }
});

const Category = mongoose.model('Category', schema);

const myCat = new Category({name: "auto"});

module.exports = Category
