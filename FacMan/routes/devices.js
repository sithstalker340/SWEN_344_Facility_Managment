var express = require('express');
var router = express.Router();
var request = require('request');

var devices = {};

// Default landing page
router.route('/')
	.get(function(req, res, next) {
		var url = api + "team=facility_management&function=getDevices";
		request.get(
			url, function(error, response, body){
				devices = JSON.parse(body);
				res.render('devices', { devices : devices });
			}
		);
});

// Add a new device
router.route('/newDevice')
	.get(function(req, res, next){
		res.render('newDevice');
	})
	.post(function(req, res, next){
		var url = api + "team=facility_management&function=addDevice";
		var data = "name=" + req.body.name + "&condition=" + req.body.condition;

		request.post({
			headers: {'content-type' : 'application/x-www-form-urlencoded'},
			url: url,
			body: data
		}, function(error, response, body){
			afterPost(error, req, res);
		}
	);
});

// Delete an existing device
router.route('/delete/:id')
	.get(function(req, res, next){
		var url = api + "team=facility_management&function=deleteDevice";
		var data = "uid=" + req.params.id;

		request.post({
			headers: {'content-type' : 'application/x-www-form-urlencoded'},
			url: url,
			body: data
		}, function(error, response, body){
			afterPost(error, req, res);
		}
	);
});

// Reserve a device
router.route('/reserve/:id')
	.get(function(req, res, next){
		var device = getDevice(req);

		var returnDate = new Date();
		returnDate.setMonth(returnDate.getMonth() + 1);

		var url = api + "team=facility_management&function=updateDevice";
		var data = "id=" + req.params.id + "&name=" + device["NAME"] + 
					"&condition=" + device["CONDITION"] + "&checkoutDate=" + new Date().toLocaleDateString() + 
					"&checkedOut=" + 1 + "&returnDate=" + returnDate.toLocaleDateString();

		request.post({
			headers: {'content-type' : 'application/x-www-form-urlencoded'},
			url: url,
			body: data
		}, function(error, response, body){
			afterPost(error, req, res);
		}
	);
});

// Return a device
router.route('/return/:id')
	.get(function(req, res, next){
			res.render('device', {return : true, reserve : false});
	})
	.post(function(req, res, next){
		var device = getDevice(req);

		var url = api + "team=facility_management&function=updateDevice";
		var data = "id=" + req.params.id + "&name=" + device["NAME"] + 
					"&condition=" + req.body.retCondition + "&checkoutDate=" + null + 
					"&checkedOut=" + 0 + "&returnDate=" + null;

		request.post({
			headers: {'content-type' : 'application/x-www-form-urlencoded'},
			url: url,
			body: data
		}, function(error, response, body){
			afterPost(error, req, res);
		}
	);
});


function afterPost(error, req, res){
	if(error){
		console.log('error', error)
	}

	res.redirect('http://' + req.get('host') + '/devices');
}

function getDevice(req){
	var device = devices.filter(function ( obj ) {
	    return obj.ID == req.params.id;
	})[0];

	return device;
}

module.exports = router;
