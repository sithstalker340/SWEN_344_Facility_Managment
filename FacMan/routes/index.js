var express = require('express');
var router = express.Router();

router.use('/devices', require('./devices'));
router.use('/classrooms', require('./classrooms'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
