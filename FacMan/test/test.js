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

var server = require('./server.js');
var test_api = require('./test_api.js');

describe('getClassroom with id=1', function() {
    it('should return 200', function (done) {
        request.get('http://localhost/team_project/SWEN-344-API/API/API.php?action=APITest&team=facility_management&function=getClassroom&id=1', function (err, res, body){
            expect(res.statusCode).to.equal(200);
            console.log(JSON.parse(res.body));
            expect(JSON.parse(res.body)).to.equal("TODO");
            done();
        });
    });

});
