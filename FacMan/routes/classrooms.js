var express = require('express');
var router = express.Router();
var request = require('request');

/* GET classroom list */
router.get('/', function(req, res, next) {
	var url = "http://vm344f.se.rit.edu/API/API.php?function=getClassrooms&team=facility_management";
	var callback = function(error, response, body) {
		var classrooms = JSON.parse(body);
		res.render('classrooms', {"classrooms" : classrooms});
	}
	request(url, callback)
});


router.get('/:id', function(req, res, next) {
	var classroom = {
		building : "GOL",
		room : req.params.id,
		size : 30
	};
	res.json(classroom);
});

module.exports = router;
