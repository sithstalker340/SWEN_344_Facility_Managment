/**
 * Created by minhduong on 4/15/17.
 */
var assert = require('assert');
var expect = require('Chai').expect;
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
var searchClassroom = '&function=searchClassroom';


var updateClassroomTest = function (base_url) {
    describe('updateClassroom', function() {
        describe('test1', function() {
            it('should return false for no parameter', function (done) {
                request.post({url:base_url+updateClassroom, form: {}}, function (err, res, body){
                    expect(body).to.equal('false');
                    done();
                });
            });
        } );
        describe('test2', function() {
            it('should return false when the system update a classroom that does not exist. ', function (done) {
                request.post({url:base_url+updateClassroom, form: {id:12222222222, capacity:40, rmNumber:3, bid:10}}, function (err, res, body){
                    expect(body).to.equal('{}');
                    done();
                });
            });
        });
        describe('test3', function() {
            it('should update classroom with id:1, capacity:40, roomNumber:3, buidlingid:10', function (done) {
                var deviceToUpdate;
                async.series([
                    function(callback) {
                        request.get(base_url + getDevices, function (err, res, body) {
                            var jsonObjs = JSON.parse(body);
                            deviceToUpdate = jsonObjs[jsonObjs.length-1];
                            console.log(deviceToUpdate);
                            callback();
                        })
                    },
                    function(callback) {
                        request.post({url:base_url+updateDevice, form: {id:deviceToUpdate.ID, condition:'very good', name:'IPhone8'}}, function (err, res, body){
                            expect(res.statusCode).to.equal(200);
                            callback();
                        });
                    },function(callback) {
                        request.get(base_url + getDevice + '&id='+deviceToUpdate.ID, function (err, res, body) {
                            var deviceAfterUpdate = JSON.parse(body);
                            console.log(deviceAfterUpdate)
                            ;                            expect(deviceAfterUpdate['CONDITION']).to.equal('very good');
                            expect(deviceAfterUpdate['NAME']).to.equal('IPhone8');
                            callback();
                        });
                    }
                ],function(err) { //This function gets called after the two tasks have called their "task callbacks"
                    if (err)
                        console.log(err);
                    done();

                });



                request.post({url:base_url+updateClassroom, form: {id:1, capacity:40, rmNumber:3, bid:10}}, function (err, res, body){
                    expect(body).to.equal('{}');
                    done();
                });
            });
        });
        describe('test4', function() {
            it('should return false be with no id', function (done) {
                request.post({url:base_url+updateClassroom, form: { capacity:40, rmNumber:3, bid:10}}, function (err, res, body){
                    expect(body).to.equal('false');
                    done();
                });
            });
        });
        describe('test5', function() {
            it('should return false be with not enough parameter include id, capacity, rmNumber, bid', function (done) {
                request.post({url:base_url+updateClassroom, form: {id:1,capacity:40}}, function (err, res, body){
                    expect(body).to.equal('false');
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
                request.get(base_url + getClassroom + '&id=1', function (err, res, body) {
                    expect(res.statusCode).to.equal(200);
                    done();
                });
            });
        } );
        describe('test2', function() {
            it('should return false for a request missing parameter', function (done) {
                request.get(base_url + getClassroom , function (err, res, body) {
                    expect(JSON.parse(body)).to.equal(false);
                    done();
                });
            });
        });
        describe('test3', function() {
            it('Should get a classroom with id =1', function (done) {
                request.get(base_url + getClassroom + '&id=1', function (err, res, body) {
                    expect(res.statusCode).to.equal(200);
                    //console.log(JSON.parse(res.body));
                    var classroom = JSON.parse(res.body);
                    expect(classroom['ID']).to.equal(1);
                    //expect(classroom['NAME']).to.equal("Device 1");
                    //expect(classroom['USER_ID']).to.equal(1);
                    done();
                });
            });
        });
        describe('test4', function() {
            it('classroom shall be null for id=-1', function (done) {
                request.get(base_url + getClassroom + '&id=-1', function (err, res, body) {
                    expect(body).to.equal('null');
                    done();
                });
            });
        });
        describe('test5', function() {
            it('classroom shall be null for id=10000 if there is no such classroom', function (done) {
                request.get(base_url + getClassroom + '&id=10000', function (err, res, body) {
                    expect(JSON.parse(body)).to.equal(null);
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
                    expect(JSON.parse(body)).to.equal(false);
                    done();
                });
            });
        } );
        describe('test2', function() {
            it('should return false with missing building parameter', function (done) {
                request.post({url:base_url+addClassroom, form: {room:2,capacity:144}}, function (err, res, body){
                    expect(body).to.equal('false');
                    done();
                });
            });
        });
        describe('test3', function() {
            it('should add classroom with building:5, room:2,capacity:144', function (done) {
                request.post({url:base_url+addClassroom, form: {building:5, room:2,capacity:144}}, function (err, res, body){
                    expect(body).to.equal('{}');
                    done();
                });
            });
        });
        describe('test4', function() {
            it('should return false with missing capacity parameter', function (done) {
                request.post({url:base_url+addClassroom, form: {building:5, room:2}}, function (err, res, body){
                    expect(body).to.equal('false');
                    done();
                });
            });
        });
        describe('test5', function() {
            it('should return false with missing room parameter', function (done) {
                request.post({url:base_url+addClassroom, form: {building:5, capacity:144}}, function (err, res, body){
                    expect(body).to.equal('false');
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
                    expect(body).to.equal('');
                    done();
                });
            });
        } );
        describe('test2', function() {
            it('should return 500 if system delete a classroom that doesn exist', function (done) {
                request.post({url:base_url+deleteClassroom, form: {id:11111111}}, function (err, res, body){
                    expect(res.statusCode).to.equal(500);
                    //expect(body).to.equal('');
                    done();
                });
            });
        });
        describe('test3', function() {
            it('should delete classroom with id=1', function (done) {
                request.post({url:base_url+deleteclassroom, form: {id:1}}, function (err, res, body){
                    expect(res.statusCode).to.equal(200);
                    expect(body).to.equal('');
                    done();
                });
            });
        });
        //describe('test4', function() {
        //    it('should return false be with only parameter name:phone', function (done) {
        //        request.post({url:base_url+addDevice, form: {name:'phone'}}, function (err, res, body){
        //            expect(JSON.parse(body)).to.equal(false);
        //            done();
        //        });
        //    });
        //});
        //describe('test5', function() {
        //    it('should return false be with only parameter condition:good', function (done) {
        //        request.post({url:base_url+addDevice, form: {condition:'good'}}, function (err, res, body){
        //            expect(JSON.parse(body)).to.equal(false);
        //            done();
        //        });
        //    });
        //});

    });
};

module.exports = {
    updateClassroom :updateClassroomTest,
    getClassrooms : getClassroomsTest,
    getClassroom : getClassroomTest,
    addClassroom : addClassroomTest,
    deleteClassroom : deleteClassroomTest
};