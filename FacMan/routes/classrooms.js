var express = require('express');
var router = express.Router();
var request = require('request');
var extend = require('extend');

/* GET classroom list */
router.get('/', function (req, res, next) {
    var url = api + "function=getClassrooms&team=facility_management";
	var userId = req.cookies["uid"];
    var callback = function (error, response, body) {
        var classrooms = JSON.parse(body);
		var urlB = api + "team=general&function=getUser&userID=" + userId;
			request.get(urlB, function(error, response, body) {
			user = JSON.parse(body);
			res.render('classrooms', {"classrooms": classrooms, user : user});
		});
    };
    request(url, callback);
});

router.route('/newClassroom')
    .get(function (req, res, next) {
        res.render('newClassroom');
    })
    .post(function (req, res, next) {

    var url = api + "team=facility_management&function=addClassroom";
    var data = "building=" + req.body.building_num + "&capacity=" + req.body.capacity +
                "&room=" + req.body.room_num;

    request.post({
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            url: url,
            body: data
        }, function (error, response, body) {
            if (error) {
                console.log('error', error)
            }

            res.redirect('http://' + req.get('host') + '/classrooms/');
        }
    );
});

router.get('/:id', function (req, res, next) {

    var urlC = api + "function=getClassroom&team=facility_management&id=" + req.params.id;
    var urlR = api + "function=getClassroomReservations&team=facility_management&id=" + req.params.id;
	var userId = req.cookies["uid"];

    var data = [];

    var callbackR = function (error, response, body) {
        //console.log(body);
        data['reserve'] = JSON.parse(body);

        console.log(data['reserve']);

		var urlB = api + "team=general&function=getUser&userID=" + userId;
			request.get(urlB, function(error, response, body) {
			user = JSON.parse(body);
			res.render('classroom', {"classroom": data, user: user});
		});
    };

    var callbackC = function (error, response, body) {

        data['classroom'] = JSON.parse(body);
        //console.log(data);
        request(urlR, callbackR);
    };

    request(urlC, callbackC);

});

router.route('/:id/getAvailableTimes')
	.get(function(req, res, next) {
		res.render('getAvailableTimes');
	})
	.post(function(req, res, next) {
		var urlA = api + "team=student_enrollment&function=getSection";
		var dataA = "&sectionID=" + req.body.section;
		
		request.get({
            url: urlA + dataA,
        }, function (error, response, body) {
			var section;
			section = JSON.parse(body);
			if (section == null) {
				res.render('getAvailableTimes', {"error" : "Please enter a valid Section ID."});
				return;
			}
			
			var urlB = api + "team=facility_management&function=searchClassrooms";
			var dataB = "&size=" + section.MAX_STUDENTS + "&semester=" + section.TERM_ID + "&day=" + req.body.day + "&length=" + req.body.length;
			request.get({
				url: urlB + dataB
			}, function (error, response, body) {
				var times = JSON.parse(body);
				console.log(times);
				var roomTimes = times[req.params.id];
				if (roomTimes == undefined) {
					res.render('getAvailableTimes', {"error" : "Sorry, there are no available timeslots."})
				}
				roomTimes = roomTimes.filter(function(time) {
					for (i = req.body.duration; i > 0; i++) {
						if (roomTimes.indexOf(i) < 0) {
							return false;
						}
					}
					return true;
				});
				var timeVals = {1: "8:00 AM", 2: "9:00 AM", 3: "10:00 AM", 4: "11:00 AM", 5: "12:00 PM", 6: "1:00 PM", 7: "2:00 PM", 8: "3:00 PM", 9: "4:00 PM", 10: "5:00 PM", 11: "6:00 PM", 12: "7:00 PM", 13: "8:00 PM"}
				var formVals = {"day" : req.body.day, "section" : section.ID, "length" : req.body.length}
				res.render("newReservation", {roomTimes: roomTimes, timeVals: timeVals, formVals: formVals})
				
				
				
				
			});
        });
	});

// Add a new reservation
router.route('/:id/newReservation')
    .post(function (req, res, next) {

    var url = api + "team=facility_management&function=reserveClassroom";
    var data = "id=" + req.params.id + "&day=" + req.body.day + "&section=" + req.body.section + "&timeslot=" + req.body.timeslot + "&length=" + req.body.length;

    request.post({
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            url: url,
            body: data
        }, function (error, response, body) {
			console.log(response);
            afterPost(error, req, res, req.params.id);
        }
    );
});
router.route('/:id/delete/')
    .get(function (req, res, next) {
        var url = api + "team=facility_management&function=deleteClassroom";
        var data = "id=" + req.params.id;

        request.post({
                headers: {'content-type': 'application/x-www-form-urlencoded'},
                url: url,
                body: data
            }, function () {
                res.redirect('http://' + req.get('host') + '/classrooms');
            }
        );
    });
function afterPost(error, req, res, id) {
    if (error) {
        console.log('error', error)
    }

    res.redirect('http://' + req.get('host') + '/classrooms/' + id);
}

module.exports = router;
