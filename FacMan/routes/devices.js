var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
	var url = api + "team=facility_management&function=getDevices";
	var callback = function(error, response, body) {
		var devices = JSON.parse(body);
		res.render('devices', 
			{
				"devices" : devices
			});
	};
	request(url, callback);
});

router.route('/:id')
.get(function(req, res, next) {
	var url = api + "team=facility_management&function=getDevice&id=" + req.params.id;
	
	var idCallback = function(error, response, body){
		device = JSON.parse(body);
		res.render('device', 
			{
				device : device
			});
	};

	request(url, idCallback);
})
.post(function(req, res, next){
	var url = api + "team=facility_management&function=updateDevice";
	var date = new Date();
	var data = {
		id : req.params.id,
		condition : device.condition,
		checkedOut : 1,
		checkoutDate : date,
		name : device.name,
		userId : 1
	};

	// request.post({
	// 	url : url,
	// 	form : data,
	// }, function(error, respose, body){
	// 	console.log(body);
	// });
});


module.exports = router;
