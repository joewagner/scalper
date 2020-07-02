/*
 *  The MIT License (MIT)
 *
 *  Copyright (c) 2014 Joe Wagner
 */

var MemoryStore = require('./memory-store');
var uuid = require('uuid');

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
    return async function (req, res, next) {
        // if this is a GET for a ticket create it and send it back
        if (req.method === 'GET' && (req.url === self.route || req.originalUrl === self.route)) {
            var value = self.authenticate(req);
            if (value) {
                try {
                    var ticket = self.generateTicket();
                    await self.store.set(ticket, value);
                    return res.json({ticket: ticket});;
                } catch (err) {
                    return next(err);
                }
            }
            // authentication failed
            return res.sendStatus(401);
        }
        next();
    };
};

// don't expose the store directly
Scalper.prototype.get = async function (ticket) {
    return await this.store.get(ticket);
};

function genTicket() {
    return uuid.v4();
}

module.exports = Scalper;