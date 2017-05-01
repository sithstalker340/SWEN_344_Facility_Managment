var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
	var url = api + "function=getDevices&team=facility_management";
	var callback = function(error, response, body) {
		var devices = JSON.parse(body);
		res.render('devices', 
			{
				"devices" : devices
			});
	};
	request(url, callback);
});

router.get('/:id', function(req, res, next) {
	// res.json(classroom);
	console.log("Not implemented");
});

module.exports = router;
