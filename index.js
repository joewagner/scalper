/*
 *  The MIT License (MIT)
 *
 *  Copyright (c) 2014 Joe Wagner
 */

var MemoryStore = require('./memory-store');
var uuid = require('node-uuid');

var Scalper = function Scalper(options) {
    options || (options = {});

    this.store = options.store || new MemoryStore();
    this.route = options.route || '/socket-ticket';
    this.generateTicket = options.genTicket || genTicket;
    this.authenticate = options.authenticate || function (req) {
        // default to sending the user id
        return req.user && (req.user.id || req.user._id);
    };

};

// middleware that issues a one time ticket to requests that pass the authentication function
Scalper.prototype.issueTickets = function () {
    var self = this;
    return function (req, res, next) {
        // if this is a GET for a ticket create it and send it back
        if (req.method === 'GET' && (req.url === self.route || req.originalUrl === self.route)) {
            var value = self.authenticate(req);
            if (value) {
                var ticket = self.generateTicket();
                return self.store.set(ticket, value, function (err) {
                    if (err) return next(err);
                    res.send({ticket: ticket});
                });
            }
            // authentication failed
            return res.send(401);
        }
        next();
    };
};

// don't expose the store directly
Scalper.prototype.get = function (ticket, done) {
    this.store.get(ticket, done);
};

function genTicket() {
    return uuid.v4();
}

module.exports = Scalper;