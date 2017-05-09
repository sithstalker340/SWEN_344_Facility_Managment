var express = require('express');
var router = express.Router();
var request = require('request');

var users = {};

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

		request.post({
			headers: {'content-type' : 'application/x-www-form-urlencoded'},
			url: url,
			body: data
		}, function(error, response, body){
			if(error){
				console.log('error', error)
			}

			if(response && response.statusCode){
				console.log(response.statusCode);
				res.redirect('http://' + req.get('host') + '/classrooms');
			}
		}
	);
});

router.route('/register')
	.get(function(req, res, next){
		var url = api + "team=general&function=getUsers";
		request.get(
			url, function(error, response, body){
				users = JSON.parse(body);
				console.log(users);
				res.render('register', {hasError : false, error : ''});
			}
		);
	})
	.post(function(req, res, next){
		var url = api + "team=general&function=createUser";
		var data = "username=" + req.body.username + "&password=" + req.body.password +
					"&fname=" + req.body.fname + "&lname=" + req.body.lname + 
					"&email=" + req.body.email + "&role=" + req.body.role;

		request.get(
			api + "team=general&function=getUsers", function(error, response, body){
				users = JSON.parse(body);
			}
		);
		var user = users.filter(function ( obj ) {
		    return obj.USERNAME == req.body.username;
		})[0];

		console.log(user);

		if(user === undefined || user === null){
			request.post({
				headers: {'content-type' : 'application/x-www-form-urlencoded'},
				url: url,
				body: data
			}, function(error, response, body){
				if(error){
					console.log('error', error)
				}

				if(response && response.statusCode){
					console.log(response.statusCode);
					res.redirect('http://' + req.get('host') + '/classrooms');
				}
			});
		} else {
			res.render('register', {hasError: true, error : 'Username already exists. Please select a different username.'});
		}

});


module.exports = router;