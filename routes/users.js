const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const User = require('./../models/users');
const authenticationMiddleware = require('./../middlewares/authentication');

// base /users
// register user
router.post('/', (req, res, next) => {


  const { username, password } = req.body;
  const user = new User({ username, password });
  user.save((err) => {
    if (err) return next(createError(400, err));
    res.send(user);
  });
});


// authenticate user
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) return next(createError(400, 'missing arguments'))
  const user = await User.findOne({ username });
  if (!user) return next(createError(401));
  const isMatch = await user.verifyPassword(password).catch(console.error);
  if (!isMatch) return next(createError(401));
  const token = await user.generateToken();
  res.send({ token, user });
});

// protected end point
router.get('/profile', authenticationMiddleware, (req, res, next) => {
  res.send(req.user);
});

module.exports = router;
