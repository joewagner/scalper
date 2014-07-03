
// a simple example the mimics something with async lookup
var user = {
    username: 'foo',
    password: 'bar',
    id: 123
};

module.exports.findById = function (id, done) {
    if (id === user.id) return done(null, user);
    done();
};

module.exports.findByUsername = function (username, done) {
    if (username === user.username) return done(null, user);
    done();
};
