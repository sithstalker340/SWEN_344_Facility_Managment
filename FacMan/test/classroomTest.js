/**
 * Created by minhduong on 4/15/17.
 */
var assert = require('assert');
var expect = require('Chai').expect;
var async = require('async');
/**
 * Created by minhduong on 3/29/17.
 */
var http = require('http');
var request = require('request');

var getClassroom = '&function=getClassroom';
var getClassrooms = '&function=getClassrooms';
var addClassroom = '&function=addClassroom';
var deleteClassroom = '&function=deleteClassroom';
var updateClassroom = '&function=updateClassroom';
var reserveClassroom = '&function=reserveClassroom';
var searchClassroom = '&function=searchClassrooms';

var error_message = "The function parameters missing are ";

var updateClassroomTest = function (base_url) {
    describe('updateClassroom', function() {
        describe('test1', function() {
            it('should return false for no parameter', function (done) {
                request.post({url:base_url+updateClassroom, form: {}}, function (err, res, body){
                    var result = JSON.parse(body);
                    expect(result["error"]).to.equal(error_message+"id,building,room,capacity");
                    done();
                });
            });
        } );
        describe('test2', function() {
            it('should return false when the system update a classroom that does not exist. ', function (done) {
                request.post({url:base_url+updateClassroom, form: {id:12222222222, capacity:40, room:3, building:10}}, function (err, res, body){
                    var result = JSON.parse(body);
                    expect(result).to.equal('0 record was updated.');
                    done();
                });
            });
        });
        describe('test3', function() {
            it('should update last classroom in the list with , capacity:40, roomNumber:3, buidlingid:10', function (done) {
                var classroomToUpdate;
                async.series([
                    function(callback) {
                        request.get(base_url + getClassrooms, function (err, res, body) {
                            var jsonObjs = JSON.parse(body);
                            classroomToUpdate = jsonObjs[jsonObjs.length-1];
                            callback();
                        })
                    },
                    function(callback) {
                        request.post({url:base_url+updateClassroom, form: {id:classroomToUpdate.ID,capacity:40, room:3, building:10 }}, function (err, res, body){
                            expect(res.statusCode).to.equal(200);
                            callback();
                        });
                    },function(callback) {
                        request.get(base_url + getClassroom + '&id='+classroomToUpdate.ID, function (err, res, body) {
                            var classroomAfterUpdate = JSON.parse(body);
                            expect(classroomAfterUpdate['CAPACITY']).to.equal(40);
                            expect(classroomAfterUpdate['ROOM_NUM']).to.equal(3);
                            expect(classroomAfterUpdate['BUILDING_ID']).to.equal(10);
                            callback();
                        });
                    }
                ],function(err) { //This function gets called after the two tasks have called their "task callbacks"
                    if (err)
                        console.log(err);
                    done();

                });
            });
        });
        describe('test4', function() {
            it('should return false be with no id', function (done) {
                request.post({url:base_url+updateClassroom, form: { capacity:40, room:3, building:10}}, function (err, res, body){
                    var result = JSON.parse(body);
                    expect(result["error"]).to.equal(error_message+"id");
                    done();
                });
            });
        });
        describe('test5', function() {
            it('should return false be with not enough parameter include id, capacity, rmNumber, bid', function (done) {
                request.post({url:base_url+updateClassroom, form: {id:1,capacity:40}}, function (err, res, body){
                    var result = JSON.parse(body);
                    expect(result["error"]).to.equal(error_message+"building,room");
                    done();
                });
            });
        });

    });
};

var getClassroomsTest = function(base_url) {
    describe('getClassrooms', function() {
        describe('test', function () {
            it('should return 200 for correct request to get a list of every classroom', function (done) {
                request.get(base_url + getClassrooms, function (err, res, body) {
                    expect(res.statusCode).to.equal(200);
                    expect(body != 'false').to.equal(true);
                    done();
                });
            });
        });
    });
};

var getClassroomTest = function(base_url) {
    describe('getClassroom', function() {
        describe('test1', function() {
            it('should return 200 for correct request', function (done) {
                request.get(base_url + getClassroom + '&id=2', function (err, res, body) {
                    expect(res.statusCode).to.equal(200);
                    done();
                });
            });
        } );
        describe('test2', function() {
            it('should return false for a request missing parameter', function (done) {
                request.get(base_url + getClassroom , function (err, res, body) {
                    var result = JSON.parse(body);
                    expect(result["error"]).to.equal(error_message+"id");
                    done();
                });
            });
        });
        describe('test3', function() {
            it('Should get a classroom with id =1', function (done) {
                request.get(base_url + getClassroom + '&id=1', function (err, res, body) {
                    expect(res.statusCode).to.equal(200);
                    var classroom = JSON.parse(res.body);
                    expect(classroom['ID']).to.equal(1);
                    done();
                });
            });
        });
        describe('test4', function() {
            it('classroom shall be null for id=-1', function (done) {
                request.get(base_url + getClassroom + '&id=-1', function (err, res, body) {
                    expect(body).to.equal('{}');
                    done();
                });
            });
        });
        describe('test5', function() {
            it('classroom shall be null for id=10000 if there is no such classroom', function (done) {
                request.get(base_url + getClassroom + '&id=10000', function (err, res, body) {
                    expect(body).to.equal('{}');
                    done();
                });
            });
        });

    });
};

var addClassroomTest = function(base_url) {
    describe('addClassroom', function() {
        describe('test1', function() {
            it('should return false for no parameter', function (done) {
                request.post({url:base_url+addClassroom, form: {}}, function (err, res, body){
                    var result = JSON.parse(body);
                    expect(result["error"]).to.equal(error_message+"building,room,capacity");
                    done();
                });
            });
        } );
        describe('test2', function() {
            it('should return false with missing building parameter', function (done) {
                request.post({url:base_url+addClassroom, form: {room:2,capacity:144}}, function (err, res, body){
                    var result = JSON.parse(body);
                    expect(result["error"]).to.equal(error_message+"building");
                    done();
                });
            });
        });
        describe('test3', function() {
            it('should add classroom with building:5, room:2,capacity:144', function (done) {
                var pastTotalClassrooms;
                async.series([
                    function(callback) {
                        request.get(base_url + getClassrooms, function (err, res, body) {
                            var jsonObjs = JSON.parse(body);
                            pastTotalClassrooms = jsonObjs.length;
                            callback();
                        })
                    },
                    function(callback) {
                        request.post({url:base_url+addClassroom, form: {building:5, room:2,capacity:144}}, function (err, res, body){
                            console.log(res.statusCode);
                            expect(res.statusCode).to.equal(200);
                            callback();
                        });
                    },function(callback) {
                        request.get(base_url + getClassrooms, function (err, res, body) {
                            var jsonObjs = JSON.parse(body);
                            expect(pastTotalClassrooms+1).to.equal(jsonObjs.length);
                            callback();
                        })
                    }
                ],function(err) { //This function gets called after the two tasks have called their "task callbacks"
                    if (err)
                        console.log(err);
                    done();

                });
            });
        });
        describe('test4', function() {
            it('should return false with missing capacity parameter', function (done) {
                request.post({url:base_url+addClassroom, form: {building:5, room:2}}, function (err, res, body){
                    var result = JSON.parse(body);
                    expect(result["error"]).to.equal(error_message+"capacity");
                    done();
                });
            });
        });
        describe('test5', function() {
            it('should return false with missing room parameter', function (done) {
                request.post({url:base_url+addClassroom, form: {building:5, capacity:144}}, function (err, res, body){
                    var result = JSON.parse(body);
                    expect(result["error"]).to.equal(error_message+"room");
                    done();
                });
            });
        });

    });
};


var deleteClassroomTest = function (base_url) {
    describe('deleteClassroom', function() {
        describe('test1', function() {
            it('should return false for no parameter', function (done) {
                request.post({url:base_url+deleteClassroom, form: {}}, function (err, res, body){
                    expect(res.statusCode).to.equal(200);
                    var result = JSON.parse(body);
                    expect(result["error"]).to.equal(error_message+"id");
                    done();
                });
            });
        } );
        describe('test2', function() {
            it('should return 500 if system delete a classroom that doesn exist', function (done) {
                request.post({url:base_url+deleteClassroom, form: {id:11111111}}, function (err, res, body){
                    expect(body).to.equal('{}');
                    done();
                });
            });
        });
        describe('test3', function() {
            it('should delete last classroom in the list ', function (done) {
                var classroomToDelete;
                async.series([
                    function(callback) {
                        request.get(base_url + getClassrooms, function (err, res, body) {
                            var jsonObjs = JSON.parse(body);
                            classroomToDelete = jsonObjs[jsonObjs.length-1];
                            callback();
                        })
                    },
                    function(callback) {
                        request.post({url:base_url+deleteClassroom, form: {id:classroomToDelete.ID}}, function (err, res, body){
                            expect(res.statusCode).to.equal(200);
                            callback();
                        });
                    },function(callback) {
                        request.get(base_url + getClassroom + '&id='+classroomToDelete.ID, function (err, res, body) {
                            expect(body).to.equal('{}');
                            callback();
                        });
                    }
                ],function(err) { //This function gets called after the two tasks have called their "task callbacks"
                    if (err)
                        console.log(err);
                    done();

                });
            });
        });
    });
};


var reserveClassroomTest = function (base_url) {
    describe('test both reserveClassroom and searchClassroom', function() {
        describe('test', function() {
            it(' ', function (done) {
                var classroomToAdd;
                var classroomToReserve;
                async.series([
                    function(callback) {
                        request.post({url:base_url+addClassroom, form: {building:5, room:2,capacity:200}}, function (err, res, body){
                            console.log(res.statusCode);
                            expect(res.statusCode).to.equal(200);
                            callback();
                        });
                    },function(callback) {
                        request.get(base_url + getClassrooms, function (err, res, body) {
                            var jsonObjs = JSON.parse(body);
                            classroomToAdd = jsonObjs[jsonObjs.length-1];
                            callback();
                        });
                    },
                    function(callback) {
                        request.post({url:base_url+reserveClassroom, form: {id:classroomToAdd.ID, day:"Monday",section:10, timeslot:"8-10",length:5}}, function (err, res, body){
                            expect(res.statusCode).to.equal(200);
                            callback();
                        });
                    },function(callback) {
                        request.get(base_url + searchClassroom+ '&size=200'+'&semester=1'+'&day="Monday"'+'&length=5', function (err, res, body) {
                            console.log(body);
                            expect(Object.keys(JSON.parse(body)).length != 0).to.equal(true);
                            callback();
                        });
                    }
                ],function(err) { //This function gets called after the two tasks have called their "task callbacks"
                    if (err)
                        console.log(err);
                    done();

                });
            });
        });
    });
};

module.exports = {
    updateClassroom :updateClassroomTest,
    getClassrooms : getClassroomsTest,
    getClassroom : getClassroomTest,
    addClassroom : addClassroomTest,
    deleteClassroom : deleteClassroomTest,
    reserveClassroom : reserveClassroomTest
};