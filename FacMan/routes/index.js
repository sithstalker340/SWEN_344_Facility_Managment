var express = require('express');
var router = express.Router();
var request = require('request');

/* Declare the API url once, and reference this var in other routes */
//api = "http://vm344f.se.rit.edu/API/API.php?"; //SWITCH TO THIS WHEN WE ARE DONE
api = "https://www.se.rit.edu/~axv3658/project/API/API.php?"; //TESTING API

router.use('/devices', require('./devices'));
router.use('/classrooms', require('./classrooms'));

/* GET home page. */
router.route('/')
	.get(function(req, res, next){
		res.render('index', {title : 'Facility Management'});
	})
	.post(function(req, res, next){
		var url = api + "team=general&function=login";
		var data = "username=" + req.body.username + "&password=" + req.body.password;

		console.log(data);

		request.post({
			headers: {'content-type' : 'application/x-www-form-urlencoded'},
			url: url,
			body: data
		}, function(error, response, body){
			if(error){
				console.log('error', error)
			}

			console.log(body);
			res.redirect('http://' + req.get('host') + '/devices');
		}
	);
});

router.route('/register')
	.get(function(req, res, next){
		res.render('index', {title : 'test'});
	})
	.post(function(req, res, next){
		
	});


module.exports = router;