var express = require('express');
var router = express.Router();
var request = require('request');

var users = {};

/* Declare the API url once, and reference this var in other routes */
// api = "http://vm344f.se.rit.edu/API/API.php?"; //SWITCH TO THIS WHEN WE ARE DONE
api = "https://www.se.rit.edu/~axv3658/project/API/API.php?"; //TESTING API

router.use('/devices', require('./devices'));
router.use('/classrooms', require('./classrooms'));

/* GET home page. */
router.route('/')
	.get(function(req, res, next){
		res.render('index', {title : 'Facility Management', loginError : false});
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

			if(response && response.body !== "null"){
				user = JSON.parse(body);
				req.session.uid = user.ID;
				req.session.test = "testing";
				res.redirect('http://' + req.get('host') + '/classrooms');
			} else {
				res.render('index', {loginError : true});
			}
		}
	);
});


module.exports = router;