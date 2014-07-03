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
    this.key = options.key || 'user';
    this.route = options.route || 'socket-token';
    this.generateToken = options.genToken || genToken;
};

Scalper.prototype.middleware = function () {
    var self = this;
    return function (req, res, next) {
        // if this is a GET for the token create it and send it back
        if (req.method === 'GET' && (req.url === route || req.originalUrl === route)) {
            var value = req[key];
            if (value) {
                var token = self.generateToken();
                return store.set(token, value, next);
            }
        }
        next();
    };
};

// don't expose the store directly
Scalper.prototype.get = function (token, done) {
    this.store.get(token, done);
};

function genToken() {
    return uuid.v4();
}

module.exports = Scalper;