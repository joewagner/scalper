
var Scalper = require('../index');
var scalper = new Scalper();
var should = require('should');

describe('scalper', function () {

    describe('middleware', function () {

        it('should exported', function (done) {
            scalper.issueTickets.should.be.an.instanceOf(Function);
            done();
        });

        it('should return 401 if not authenticated', function (done) {
            // stub req, res objects
            var req = {
                method: 'GET',
                url: '/socket-ticket'
            };

            var res = {
                send: function (status) {
                    status.should.equal(401);
                    done();
                }
            };

            scalper.issueTickets()(req, res);
        });

    });


    it('should export a getter function', function (done) {
        console.log(scalper.get);
        scalper.get.should.be.an.instanceOf(Function);
        done();
    });

})
