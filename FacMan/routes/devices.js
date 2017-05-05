var express = require('express');
var router = express.Router();
var request = require('request');

var devices = {};

router.route('/')
	.get(function(req, res, next) {
		var url = api + "team=facility_management&function=getDevices";
		var callback = function(error, response, body) {
			devices = JSON.parse(body);

			res.render('devices', 
				{
					devices : devices,
					deleteDevice : "deleteDevice();"
				});
		};
		request(url, callback);
	});

router.route('/newDevice')
	.get(function(req, res, next){
		res.render('newDevice', { complete : false });
	})
	.post(function(req, res, next){
		var url = api + "team=facility_management&function=addDevice";
		var data = "name=" + req.body.name + "&condition=" + req.body.condition;

		request.post({
			headers: {'content-type' : 'application/x-www-form-urlencoded'},
			url: url,
			body: data
		}, function(error, response, body){
			if(error){
				console.log('error', error);
			}

			res.redirect('http://' + req.get('host') + '/devices', '301');
		});
	});

router.route('/delete/:id')
	.get(function(req, res, next){
		var url = api + "team=facility_management&function=deleteDevice";
		var data = "uid=" + req.params.id;

		request.post({
			headers: {'content-type' : 'application/x-www-form-urlencoded'},
			url: url,
			body: data
		}, function(error, response, body){
			if(error){
				console.log('error', error);
			}

			res.redirect('http://' + req.get('host') + '/devices', '301');
		});
	});
	

// router.get('/:id', function(req, res, next) {
// 	var url = api + "team=facility_management&function=getDevice&id=" + req.params.id;
	
// 	request(url, function(error, response, body){
// 		device = JSON.parse(body);

// 		res.render('device', 
// 			{
// 				device : device
// 			});
// 	});
// });


// router.post('/:id', function(req, res, next){
// 	var url = api + "team=facility_management&function=updateDevice";
// 	var date = new Date();
// 	var data = {
// 		id : req.params.id,
// 		condition : "test cond",
// 		checkedOut : 1,
// 		checkoutDate : date,
// 		name : "test name",
// 		userId : '1'
// 	};

// 	request.post({
// 		url : url,
// 		form : data,
// 	}, function(error, respose, body){

// 	});
// });

module.exports = router;
