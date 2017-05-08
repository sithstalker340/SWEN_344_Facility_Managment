var express = require('express');
var router = express.Router();

/* Declare the API url once, and reference this var in other routes */
//api = "http://vm344f.se.rit.edu/API/API.php?"; //SWITCH TO THIS WHEN WE ARE DONE
api = "https://www.se.rit.edu/~axv3658/project/API/API.php?"; //TESTING API

router.use('/devices', require('./devices'));
router.use('/classrooms', require('./classrooms'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.route('/login')
	.get(function(req, res, next){
		res.render('login');
	})
	.post(function(req, res, next){
		var url = api + "team=facility_management&function=addDevice";
		var data = "name=" + req.body.name + "&condition=" + req.body.condition;

		// request.post({
		// 	headers: {'content-type' : 'application/x-www-form-urlencoded'},
		// 	url: url,
		// 	body: data
		// }, function(error, response, body){
		// 	afterPost(error, req, res);
		// }
	// );
	res.render('classrooms');
});


module.exports = router;