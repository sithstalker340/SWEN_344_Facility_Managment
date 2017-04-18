var express = require('express');
var router = express.Router();
var db = require('./database.js');
var http = require('http');

/* GET classroom list */
router.get('/', function(req, res, next) {
	var httpOptions = {
		"host" : "www.vm344f.se.rit.edu",
		"path" : "/API/API.php?function=getClassrooms&team=facility_management"
	}
	var httpCallback = function(response) {
		var classrooms = JSON.parse(response);
		res.render('classrooms', {"classrooms" : classrooms});
	}
	
	http.request(httpOptions, httpCallback).end();
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
