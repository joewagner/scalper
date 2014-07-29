
var Scalper = require('../index');
var MemoryStore = require('../memory-store');
var should = require('should');

describe('scalper', function () {

    describe('middleware', function () {

        it('should be exported', function (done) {
            var scalper = new Scalper();
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

            var scalper = new Scalper();
            scalper.issueTickets()(req, res);
        });

    });

    it('should export a getter function', function (done) {
        var scalper = new Scalper();
        scalper.get.should.be.an.instanceOf(Function);
        done();
    });

    describe('authenticate option', function () {
        it('should allow setting custom value', function (done) {
            var count = 0;

            var scalper = new Scalper({
                authenticate: function (req) {
                    count++;
                    return true;
                }
            });

            var req = {
                method: 'GET',
                url: '/socket-ticket'
            };
            var res = {
                send: function (data) {
                    should.exist(data.ticket);
                    count.should.equal(1);
                    done();
                }
            }
            scalper.issueTickets()(req, res);
        });

        it('should default to checking req.user._id', function (done) {
            var scalper = new Scalper();

            var req = {
                method: 'GET',
                url: '/socket-ticket',
                user: {
                    _id: 'foo'
                }
            };
            var res = {
                send: function (data) {
                    should.exist(data.ticket);
                    done();
                }
            };
            scalper.issueTickets()(req, res);
        });

        it('should default to checking req.user.id', function (done) {
            var scalper = new Scalper();

            var req = {
                method: 'GET',
                url: '/socket-ticket',
                user: {
                    id: 'foo'
                }
            };
            var res = {
                send: function (data) {
                    should.exist(data.ticket);
                    done();
                }
            };
            scalper.issueTickets()(req, res);
        });
    });

    describe('store option', function () {
        it('should default to memory store', function (done) {
            var scalper = new Scalper();

            scalper.store.should.be.instanceOf(MemoryStore);
            done();
        });

        it('should be configurable', function (done) {
            var memStore = new MemoryStore();

            var scalper = new Scalper({
                store: memStore
            });

            var req = {
                method: 'GET',
                url: '/socket-ticket',
                user: {
                    id: 'foo'
                }
            };
            var res = {
                send: function (data) {
                    should.exist(data.ticket);
                    Object.keys(memStore.tickets).length.should.equal(1);
                    done();
                }
            };
            scalper.issueTickets()(req, res);
        });
    });

    describe('route option', function () {
        it('should default to `/socket-ticket`', function (done) {
            var scalper = new Scalper();

            scalper.route.should.equal('/socket-ticket');
            done();
        });

        it('should be configurable', function (done) {
            var scalper = new Scalper({
                route: '/ticket-foo'
            });

            scalper.route.should.equal('/ticket-foo');

            var req = {
                method: 'GET',
                url: '/socket-ticket',
                user: {
                    id: 'foo'
                }
            };
            var res = {};

            var middleware = scalper.issueTickets();
            middleware(req, res, function () {
                res.send = function (data) {
                    should.exist(data.ticket);
                    done();
                };
                req.url = '/ticket-foo';

                middleware(req, res);
            });
        });
    });

    describe('genTicket option', function () {
        it('should accept custom function', function (done) {
            var scalper = new Scalper({
                genTicket: function () {
                    return 'custom-value';
                }
            });

            var req = {
                method: 'GET',
                url: '/socket-ticket',
                user: {
                    id: 'foo'
                }
            };
            var res = {
                send: function (data) {
                    should.exist(data.ticket);
                    data.ticket.should.equal('custom-value');
                    done();
                }
            }
            scalper.issueTickets()(req, res);
        });
    });
});
