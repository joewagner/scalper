/*
 *  The MIT License (MIT)
 *
 *  Copyright (c) 2014 Joe Wagner
 */

// Very simple memory store implementation
var MemoryStore = module.exports = function MemoryStore() {
    this.tokens = {};
};

// Store should return a one time access token
MemoryStore.prototype.get = function(token, done) {
    // delete the token from the store and return its value
    var val = this.tokens[token];
    delete this.tokens[token];
    done && done(null, val);
};

MemoryStore.prototype.set = function (token, val, done) {
    this.tokens[token] = val;
    done && done(null, val);
};
