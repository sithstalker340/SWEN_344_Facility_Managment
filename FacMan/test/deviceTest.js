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

var getDevice = '&function=getDevice';
var getDevices = '&function=getDevices';
var addDevice = '&function=addDevice';
var deleteDevice = '&function=deleteDevice';
var updateDevice = '&function=updateDevice';

var add_device_error_msg = 'Missing parameters. Function addDevice requires: name, condition.';
var delete_device_error_msg = 'Missing parameter. Function deleteDevice requires: uid.';
var update_device_error_msg = 'Missing parameters. Function updateDevice requires: id, condition, checkoutDate, name, userId.';
var getDevicesfunciton = function (base_url,callback) {
    request.get(base_url + getDevices, function (err, res, body) {
        return callback(res);
    });
};


var updateDeviceTest = function(base_url) {
    describe('updateDevice', function() {
        describe('test1', function() {
            it('should return false for no parameter', function (done) {
                request.post({url:base_url+updateDevice, form: {}}, function (err, res, body){
                    expect(JSON.parse(body)).to.equal(update_device_error_msg);
                    done();
                });
            });
        } );
        describe('test2', function() {
            it('should return false when the system update a device that does not exist. ', function (done) {
                request.post({url:base_url+updateDevice, form: {uid:122222, condition:'good'}}, function (err, res, body){
                    expect(JSON.parse(body)).to.equal(update_device_error_msg);
                    done();
                });
            });
        });
        describe('test3', function() {
            it('should update last device on the list with condition:very good, name:IPhone8', function (done) {
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
                        request.post({url:base_url+updateDevice, form: {id:deviceToUpdate.ID, condition:'very good',checkoutDate:'11/11/2017' ,name:'IPhone8',userId:"15"}}, function (err, res, body){
                            expect(res.statusCode).to.equal(200);
                            callback();
                        });
                    },function(callback) {
                        request.get(base_url + getDevice + '&id='+deviceToUpdate.ID, function (err, res, body) {
                            var deviceAfterUpdate = JSON.parse(body);
                            console.log(deviceAfterUpdate);
                            expect(deviceAfterUpdate['CONDITION']).to.equal('very good');
                            expect(deviceAfterUpdate['NAME']).to.equal('IPhone8');
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
            it('should return false be with only parameter uid:1', function (done) {
                request.post({url:base_url+updateDevice, form: {uid:1}}, function (err, res, body){
                    expect(JSON.parse(body)).to.equal(update_device_error_msg);
                    done();
                });
            });
        });
        describe('test5', function() {
            it('should return false be with only parameter condition:good', function (done) {
                request.post({url:base_url+updateDevice, form: {condition:'good'}}, function (err, res, body){
                    expect(JSON.parse(body)).to.equal(update_device_error_msg);

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
                getDevicesfunciton(base_url+ getDevices,function(response) {

                    expect(response.statusCode).to.equal(200);
                    expect(response.body != 'false').to.equal(true);
                    done();
                });
            });
        });
    });
};

var getDeviceTest = function(base_url) {
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
                var lastDevice;
                async.series([
                    function(callback) {
                        request.get(base_url + getDevices, function (err, res, body) {
                            var jsonObjs = JSON.parse(body);
                            lastDevice = jsonObjs[jsonObjs.length-1];
                            callback();
                        })
                    },
                    function(callback) {
                        request.get(base_url + getDevice+'&id='+lastDevice.ID, function (err, res, body) {
                            if (res.statusCode == 200) {
                                var Device = JSON.parse(body);
                                expect(Device.ID).to.equal(lastDevice.ID);
                            }
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
        describe('test3', function () {
            it('should return false for a request missing parameter', function (done) {
                request.get(base_url + getDevice , function (err, res, body) {
                    expect(JSON.parse(body)).to.equal("Missing parameters. Function getDevice requires: id.");
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
};

var addDeviceTest = function(base_url) {
    describe('addDevice', function() {
        describe('test1', function() {
            it('should return false for no parameter', function (done) {
                request.post({url:base_url+addDevice, form: {}}, function (err, res, body){
                    expect(JSON.parse(body)).to.equal(add_device_error_msg);
                    done();
                });
            });
        } );
        describe('test3', function() {
            it('should add device with name:phone and condition:good', function (done) {
                var pastTotalDevices;
                async.series([
                    function(callback) {
                        request.get(base_url + getDevices, function (err, res, body) {
                            var jsonObjs = JSON.parse(body);
                            pastTotalDevices = jsonObjs.length;
                            callback();
                        })
                    },
                    function(callback) {
                        request.post({url:base_url+addDevice, form: {name:'phone', condition:'good'}}, function (err, res, body){
                            expect(res.statusCode).to.equal(200);
                            callback();
                        });
                    },function(callback) {
                        request.get(base_url + getDevices, function (err, res, body) {
                            var jsonObjs = JSON.parse(body);
                            expect(pastTotalDevices+1).to.equal(jsonObjs.length);
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
            it('should return false be with only parameter name:phone', function (done) {
                request.post({url:base_url+addDevice, form: {name:'phone'}}, function (err, res, body){
                    expect(JSON.parse(body)).to.equal(add_device_error_msg);
                    done();
                });
            });
        });
        describe('test5', function() {
            it('should return false be with only parameter condition:good', function (done) {
                request.post({url:base_url+addDevice, form: {condition:'good'}}, function (err, res, body){
                    expect(JSON.parse(body)).to.equal(add_device_error_msg);
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
                    expect(JSON.parse(body)).to.equal(delete_device_error_msg);
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
            it('should delete device ', function (done) {
                var deviceToDelete;
                async.series([
                    function(callback) {
                        request.get(base_url + getDevices, function (err, res, body) {
                            var jsonObjs = JSON.parse(body);
                            deviceToDelete = jsonObjs[jsonObjs.length-1];
                            callback();
                        })
                    },
                    function(callback) {
                        request.post({url:base_url+deleteDevice, form: {uid:deviceToDelete.ID}}, function (err, res, body){
                            expect(res.statusCode).to.equal(200);
                            callback();
                        });
                    },function(callback) {
                        request.get(base_url + getDevice + '&id='+deviceToDelete.ID, function (err, res, body) {
                            expect(JSON.parse(body)).to.equal(null);
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
            it('should return false be with wrong parameter to delete a device', function (done) {
                request.post({url:base_url+deleteDevice, form: {name:'phone'}}, function (err, res, body){
                    expect(JSON.parse(body)).to.equal(delete_device_error_msg);
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