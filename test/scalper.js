
var Scalper = require('../index');
var scalper = new Scalper();
var should = require('should');

describe('scalper', function () {

    it('should export middleware', function (done) {
        scalper.issueTickets.should.be.an.instanceOf(Function);
        done();
    });

    it('should export a getter function', function (done) {
        console.log(scalper.get);
        scalper.get.should.be.an.instanceOf(Function);
        done();
    });

})
