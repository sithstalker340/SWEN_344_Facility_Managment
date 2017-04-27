/**
 * Created by minhduong on 3/29/17.
 */
var assert = require('assert');
var expect = require('Chai').expect;
var deviceTest = require('./deviceTest.js');
var classroomTest = require('./classroomTest.js');
/**
 * Created by minhduong on 3/29/17.
 */
var http = require('http');
var request = require('request');

var base_url = 'http://vm344f.se.rit.edu/API/API.php?team=facility_management';
//
//var getDevice = '&function=getDevice';
//var getDevices = '&function=getDevices';
//var addDevice = '&function=addDevice';
//var deleteDevice = '&function=deleteDevice';
//var updateDevice = '&function=updateDevice';
//
//var getClassroom = '&function=getClassroom';
//var getClassrooms = '&function=getClassrooms';
//var addClassroom = '&function=addClassroom';
//var deleteClassroom = '&function=deleteClassroom';
//var updateClassroom = '&function=updateClassroom';
//var reserveClassroom = '&function=reserveClassroom';
//var searchClassroom = '&function=searchClassroom';



deviceTest.updateDevice(base_url);
deviceTest.getDevices(base_url);
deviceTest.getDevice(base_url);
deviceTest.addDevice(base_url);
deviceTest.deleteDevice(base_url);
//
//
//classroomTest.updateClassroom(base_url);
//classroomTest.getClassrooms(base_url);
//classroomTest.getClassroom(base_url);
//classroomTest.addClassroom(base_url);



//});
////
/////////////////////// Classroom
//

////
////
