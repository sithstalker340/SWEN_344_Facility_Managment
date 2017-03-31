/**
 * Created by minhduong on 3/29/17.
 */
var assert = require('assert');
var expect = require('Chai').expect;
/**
 * Created by minhduong on 3/29/17.
 */
var http = require('http');
var request = require('request');

var base_url = 'https://www.se.rit.edu/~axv3658/API/API.php?team=facility_management';

var getDevice = '&function=getDevice';
var getDevices = '&function=getDevices';
var addDevice = '&function=addDevice';
var deleteDevice = '&function=deleteDevice';
var updateDevice = '&function=updateDevice';

var getClassroom = '&function=getClassroom';
var getClassrooms = '&function=getClassrooms';
var addClassroom = '&function=addClassroom';
var deleteClassroom = '&function=deleteClassroom';
var updateClassroom = '&function=updateClassroom';
var reserveClassroom = '&function=reserveClassroom';
var searchClassroom = '&function=searchClassroom';

describe('getDevice', function() {
    describe('test1', function() {
        it('should return 200 for correct request', function (done) {
            request.get(base_url + getDevice + '&id=1', function (err, res, body) {
                expect(res.statusCode).to.equal(200);
                done();
            });
        });
    } );
    describe('test2', function() {
        it('should return false for a request missing parameter', function (done) {
            request.get(base_url + getDevice , function (err, res, body) {
                expect(JSON.parse(body)).to.equal(false);
                done();
            });
        });
    });
    describe('test3', function() {
        it('Should get a device with id =1', function (done) {
            request.get(base_url + getDevice + '&id=1', function (err, res, body) {
                //expect(res.statusCode).to.equal(200);
                //console.log(JSON.parse(res.body));
                var classroom = JSON.parse(res.body);
                expect(classroom['ID']).to.equal(1);
                expect(classroom['NAME']).to.equal("Device 1");
                expect(classroom['USER_ID']).to.equal(1);
                done();
            });
        });
    });
    describe('test4', function() {
        it('device shall be null for id=-1', function (done) {
            request.get(base_url + getDevice + '&id=-1', function (err, res, body) {
                expect(JSON.parse(body)).to.equal(null);
                done();
            });
        });
    });
    describe('test5', function() {
        it('device shall be null for id=100 if there is no such device', function (done) {
            request.get(base_url + getDevice + '&id=100', function (err, res, body) {
                expect(JSON.parse(body)).to.equal(null);
                done();
            });
        });
    });

});


describe('addDevice', function() {
    describe('test1', function() {
        it('should return false for no parameter', function (done) {
            request.post({url:base_url+addDevice, form: {}}, function (err, res, body){
                expect(JSON.parse(body)).to.equal(false);
                done();
            });
        });
    } );
    //describe('test2', function() {
    //    it('should return false for a request missing parameter', function (done) {
    //        request.get(base_url + getDevice , function (err, res, body) {
    //            expect(JSON.parse(body)).to.equal(false);
    //            done();
    //        });
    //    });
    //});
    describe('test3', function() {
        it('should add device with name:phone and condition:good', function (done) {
            request.post({url:base_url+addDevice, form: {name:'phone', condition:'good'}}, function (err, res, body){
                expect(body).to.equal('{}');
                done();
            });
        });
    });
    describe('test4', function() {
        it('should return false be with only parameter name:phone', function (done) {
            request.post({url:base_url+addDevice, form: {name:'phone'}}, function (err, res, body){
                expect(JSON.parse(body)).to.equal(false);
                done();
            });
        });
    });
    describe('test5', function() {
        it('should return false be with only parameter condition:good', function (done) {
            request.post({url:base_url+addDevice, form: {condition:'good'}}, function (err, res, body){
                expect(JSON.parse(body)).to.equal(false);
                done();
            });
        });
    });

});


describe('deleteDevice', function() {
    describe('test1', function() {
        it('should return false for no parameter', function (done) {
            request.post({url:base_url+deleteDevice, form: {}}, function (err, res, body){
                expect(res.statusCode).to.equal(200);
                expect(body).to.equal('');
                done();
            });
        });
    } );
    describe('test2', function() {
        it('should return 500 if system delete a device that doesn exist', function (done) {
            request.post({url:base_url+deleteDevice, form: {id:11111111}}, function (err, res, body){
                expect(res.statusCode).to.equal(500);
                //expect(body).to.equal('');
                done();
            });
        });
    });
    describe('test3', function() {
        it('should delete device with id=1', function (done) {
            request.post({url:base_url+deleteDevice, form: {id:1}}, function (err, res, body){
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

describe('updateDevice', function() {
    describe('test1', function() {
        it('should return false for no parameter', function (done) {
            request.post({url:base_url+updateDevice, form: {}}, function (err, res, body){
                expect(JSON.parse(body)).to.equal(false);
                done();
            });
        });
    } );
    //describe('test2', function() {
    //    it('should return false for a request missing parameter', function (done) {
    //        request.get(base_url + getDevice , function (err, res, body) {
    //            expect(JSON.parse(body)).to.equal(false);
    //            done();
    //        });
    //    });
    //});
    describe('test3', function() {
        it('should add device with name:phone and condition:good', function (done) {
            request.post({url:base_url+updateDevice, form: {uid:1, condition:'good'}}, function (err, res, body){
                expect(body).to.equal('{}');
                done();
            });
        });
    });
    describe('test4', function() {
        it('should return false be with only parameter name:phone', function (done) {
            request.post({url:base_url+updateDevice, form: {uid:1}}, function (err, res, body){
                expect(JSON.parse(body)).to.equal(false);
                done();
            });
        });
    });
    describe('test5', function() {
        it('should return false be with only parameter condition:good', function (done) {
            request.post({url:base_url+updateDevice, form: {condition:'good'}}, function (err, res, body){
                expect(JSON.parse(body)).to.equal(false);
                done();
            });
        });
    });

});







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
            request.get(base_url + getDevice + '&id=10000', function (err, res, body) {
                expect(JSON.parse(body)).to.equal(null);
                done();
            });
        });
    });

});


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
        });;
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