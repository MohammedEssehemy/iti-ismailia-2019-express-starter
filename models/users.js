const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const secretKey = 'mySecretKey';


const sign = (...args) => {
  return new Promise((resolve, reject) => {
    jwt.sign(...args, (err, result) => {
      if(err) return reject(err);
      resolve(result);
    });
  });
};


const verify = (...args) => {
  return new Promise((resolve, reject) => {
    jwt.verify(...args, (err, result) => {
      if(err) return reject(err);
      resolve(result);
    });
  });
}


const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    },
  },
  password: {
    type: String,
    required: true,
  }
}, {
  toJSON: {
    hide: 'password',
    transform: true,
  },
  autoIndex: true
});


schema.options.toJSON.transform = function (doc, ret, options) {
  if (options.hide) {
    options.hide.split(' ').forEach((prop) => { delete ret[prop]; });
  }
  return ret;
}


const hashPassword = password => bcrypt.hash(password, saltRounds);

schema.pre('save', async function(){
  const user = this;
  if(user.isNew || user.modifiedPaths.includes('password')){
    user.password = await hashPassword(user.password)
  }
});

schema.method('verifyPassword', function(comparePassword){
  return bcrypt.compare(comparePassword, this.password);
});

schema.method('generateToken', async function(){
  const user = this;
  console.log(user.id);
  const token = await sign({ _id: user.id },secretKey, { expiresIn: '5m' });
  return token;
});

schema.static('decodeToken', function(token){
    return verify(token,secretKey);
})

const User = mongoose.model('User', schema);

module.exports = User;
