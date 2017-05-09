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

var base_url = 'http://www.se.rit.edu/~mcd4874/SWEN-344-API/API/API.php?team=facility_management';
//var base_url = 'http://vm344c.se.rit.edu/SWEN-344-API/API/API.php?team=facility_management';

deviceTest.updateDevice(base_url);
deviceTest.getDevices(base_url);
deviceTest.getDevice(base_url);
deviceTest.addDevice(base_url);
deviceTest.deleteDevice(base_url);


classroomTest.updateClassroom(base_url);
classroomTest.getClassrooms(base_url);
classroomTest.getClassroom(base_url);
classroomTest.addClassroom(base_url);
classroomTest.deleteClassroom(base_url);
classroomTest.reserveClassroom(base_url);

