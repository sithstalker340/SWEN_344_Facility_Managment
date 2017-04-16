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

var getDevice = '&function=getDevice';
var getDevices = '&function=getDevices';
var addDevice = '&function=addDevice';
var deleteDevice = '&function=deleteDevice';
var updateDevice = '&function=updateDevice';


var updateDeviceTest = function(base_url) {
    describe('updateDevice', function() {
        describe('test1', function() {
            it('should return false for no parameter', function (done) {
                request.post({url:base_url+updateDevice, form: {}}, function (err, res, body){
                    expect(body).to.equal('false');
                    done();
                });
            });
        } );
        describe('test2', function() {
            it('should return false when the system update a device that does not exist. ', function (done) {
                request.post({url:base_url+updateDevice, form: {uid:122222, condition:'good'}}, function (err, res, body){
                    expect(body).to.equal('false');
                    done();
                });
            });
        });
        //$_POST["id"], $_POST["condition"], $_POST["checkoutDate"], $_POST["name"], $_POST["userId"
        describe('test3', function() {
            it('should update device with uid:1, condition:good, name:Phone', function (done) {
                request.post({url:base_url+updateDevice, form: {id:2, condition:'good', name:'Iphone'}}, function (err, res, body){
                    expect(body).to.equal('{}');
                    expect(res.statusCode).to.equal(200);
                    request.get(base_url + getDevice + '&id=1', function (err, res, body) {
                        var classroom = JSON.parse(res.body);
                        expect(classroom['CONDITION']).to.equal('good');
                        expect(classroom['NAME']).to.equal('Iphone');
                    });
                    done();
                });
            });
        });
        describe('test4', function() {
            it('should return false be with only parameter uid:1', function (done) {
                request.post({url:base_url+updateDevice, form: {uid:1}}, function (err, res, body){
                    expect(body).to.equal('false');
                    done();
                });
            });
        });
        describe('test5', function() {
            it('should return false be with only parameter condition:good', function (done) {
                request.post({url:base_url+updateDevice, form: {condition:'good'}}, function (err, res, body){
                    expect(body).to.equal('false');

                    done();
                });
            });
        });

    });

};

var getDevicesTest = function (base_url) {
    describe('getDevices', function() {
        describe('test', function () {
            it('should return 200 for correct request to get a list of every devices', function (done) {
                request.get(base_url + getDevices, function (err, res, body) {
                    expect(res.statusCode).to.equal(200);
                    expect(body != 'false').to.equal(true);
                    done();
                });
            });
        });
    });
};

var getDeviceTest = function(base_url) {
    //describe('test1', function() {
    //    it('should return 200 for correct request', function (done) {
    //        request.get(base_url + getDevice + '&id=1', function (err, res, body) {
    //            expect(res.statusCode).to.equal(200);
    //            done();
    //        });
    //    });
    //} );
    //request.get(base_url + getDevices, function (err, res, body) {
    //    if (res.statusCode == 200) {
    //        var listDevices = JSON.parse(body);
    //
    //        if (listDevices.length > 0) {
    //            var testDevice = listDevices[0];
    //            var deviceID = '&id='+testDevice.ID;

    describe('getDevice', function () {
        describe('test1', function () {
            it('should return 200 for correct request', function (done) {
                request.get(base_url + getDevice + '&id=1', function (err, res, body) {
                    expect(res.statusCode).to.equal(200);
                    done();
                });
            });
        });
        describe('test2', function () {
            it('should return false for a request missing parameter', function (done) {
                request.get(base_url + getDevice, function (err, res, body) {
                    expect(JSON.parse(body)).to.equal("Missing parameters. Function getDevice requires: id.");
                    done();
                });
            });
        });
        describe('test3', function () {
            it('Should get a device with id =1', function (done) {
                request.get(base_url + getDevice + '&id=1', function (err, res, body) {
                    if (res.statusCode == 200) {
                        var Device = JSON.parse(body);
                        expect(Device.ID).to.equal(1);
                    }
                    done();
                });
            });
        });
        describe('test4', function () {
            it('device shall be null for id=-1', function (done) {
                request.get(base_url + getDevice + '&id=-1', function (err, res, body) {
                    expect(JSON.parse(body)).to.equal(null);
                    done();
                });
            });
        });
        describe('test5', function () {
            it('device shall be null for id=100 if there is no such device', function (done) {
                request.get(base_url + getDevice + '&id=1000', function (err, res, body) {
                    expect(JSON.parse(body)).to.equal(null);
                    done();
                });
            });
        });

    });

//            }
//        }
//    });
};

var addDeviceTest = function(base_url) {
    describe('addDevice', function() {
        describe('test1', function() {
            it('should return false for no parameter', function (done) {
                request.post({url:base_url+addDevice, form: {}}, function (err, res, body){
                    expect(JSON.parse(body)).to.equal(false);
                    done();
                });
            });
        } );
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
};

var deleteDeviceTest = function (base_url) {
    describe('deleteDevice', function() {
        describe('test1', function() {
            it('should return false for no parameter', function (done) {
                request.post({url:base_url+deleteDevice, form: {}}, function (err, res, body){
                    expect(body).to.equal('false');
                    done();
                });
            });
        } );
        describe('test2', function() {
            it('should return 500 if system delete a device that doesn exist', function (done) {
                request.post({url:base_url+deleteDevice, form: {uid:11111111}}, function (err, res, body){
                    //expect(res.statusCode).to.equal(500);
                    expect(body).to.equal('{}');
                    done();
                });
            });
        });
        describe('test3', function() {
            it('should delete device with id=1', function (done) {
                request.post({url:base_url+deleteDevice, form: {uid:1}}, function (err, res, body){
                    expect(res.statusCode).to.equal(200);
                    //expect(body).to.equal('');
                    request.get(base_url + getDevice + '&id=1', function (err, res, body) {
                        expect(JSON.parse(body)).to.equal(null);
                    });
                    done();
                });
            });
        });
        describe('test4', function() {
            it('should return false be with wrong parameter to delete a device', function (done) {
                request.post({url:base_url+deleteDevice, form: {name:'phone'}}, function (err, res, body){
                    expect(JSON.parse(body)).to.equal(false);
                    done();
                });
            });
        });

    });

};




module.exports = {
    updateDevice :updateDeviceTest,
    getDevices : getDevicesTest,
    getDevice : getDeviceTest,
    addDevice : addDeviceTest,
    deleteDevice : deleteDeviceTest
};