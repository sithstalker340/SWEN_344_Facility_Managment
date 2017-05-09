var express = require('express');
var router = express.Router();
var request = require('request');
var extend = require('extend');

router.get('/:id', function (req, res, next) {

    var urlC = api + "function=getClassroom&team=facility_management&id=" + req.params.id;
    var urlR = api + "function=getClassroomReservations&team=facility_management&id=" + req.params.id;

    var data = [];

    var callbackR = function (error, response, body) {
        //console.log(body);
        data['reserve'] = JSON.parse(body);

        console.log(data['reserve']);

        res.render('classroom', {"classroom": data});
    };

    var callbackC = function (error, response, body) {

        data['classroom'] = JSON.parse(body);
        //console.log(data);
        request(urlR, callbackR);
    };

    request(urlC, callbackC);

});

/* GET classroom list */
router.get('/', function (req, res, next) {
    var url = api + "function=getClassrooms&team=facility_management";
    var callback = function (error, response, body) {
        var classrooms = JSON.parse(body);
        res.render('classrooms', {"classrooms": classrooms});
    };
    request(url, callback);
});

// Add a new reservation
router.route('/:id/newReservation')
    .get(function (req, res, next) {
        res.render('newReservation');
    }).post(function (req, res, next) {

    var url = api + "team=facility_management&function=reserveClassroom";
    var data = "id=" + req.params.id + "&day=" + req.body.section + "&section=" + req.body.section + "&timeslot=" + req.body.timeslot + "&length=" + req.body.length;

    request.post({
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            url: url,
            body: data
        }, function (error, response, body) {
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
