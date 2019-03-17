var express = require('express');
var router = express.Router();

// base /users
/* GET users listing. */

router.use((req,res,next) => {
  console.log('check authentication');
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/:userId', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/', function(req, res, next) {
  res.send('respond with a resource');
});



module.exports = router;
