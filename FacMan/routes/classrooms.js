var express = require('express');
var router = express.Router();
var request = require('request');
var extend = require('extend');

router.get('/:id', function(req, res, next) {
	var urlC = "http://vm344f.se.rit.edu/API/API.php?function=getClassroom&team=facility_management&id=" + req.params.id;
    var urlR = "http://vm344f.se.rit.edu/API/API.php?function=getClassroomReservations&team=facility_management&id=" + req.params.id;
    var classroom;
    var reserve;

    var callbackR = function(error, response, body) {
        console.log(body);
        reserve = JSON.parse(body);	
        
        var data = extend({}, classroom, reserve);
        res.render('classroom', {"classroom" : data});
    }
    
    var callbackC = function(error, response, body) {
       console.log(body);
       classroom = JSON.parse(body);	
        
        request(urlR,callbackR);
	};
    
	request(urlC, callbackC);
    
    
});


/* GET classroom list */
router.get('/', function(req, res, next) {
	var url = api + "function=getClassrooms&team=facility_management";
	var callback = function(error, response, body) {
		var classrooms = JSON.parse(body);
		res.render('classrooms', {"classrooms" : classrooms});
	};
	request(url, callback);
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
