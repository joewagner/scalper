/*
 *  The MIT License (MIT)
 *
 *  Copyright (c) 2014 Joe Wagner
 */

// Very simple memory store implementation
var MemoryStore = module.exports = function MemoryStore() {
    this.tickets = {};
};

// Store should return a one time access ticket
MemoryStore.prototype.get = function(ticket, done) {
    // delete the ticket from the store and return its value
    var val = this.tickets[ticket];
    delete this.tickets[ticket];
    done && done(null, val);
};

MemoryStore.prototype.set = function (ticket, val, done) {
    this.tickets[ticket] = val;
    done && done(null, val);
};
