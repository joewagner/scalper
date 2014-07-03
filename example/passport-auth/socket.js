
var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var Scalper = require('../../index');

var userStore = require('./user-store');

var scalper = new Scalper({
    store: require('./ticket-store')
});

// setup diffent server for socket.io, this could even be on a separate domain
app.listen(8080);

function handler (req, res) {}

io.use(function (socket, next) {
    // already authenticated
    if (socket.user) return next();

    var ticket = socket.handshake.query && socket.handshake.query.authticket;
    if (ticket) {
        // get the data stored on this ticket
        return scalper.get(ticket, function (err, ticketData) {
            if (err) return next(err);
            // lookup user though the ticket
            userStore.findById(ticketData.userId, function (err, user) {
                if (err) return next(err);
                // check that this socket is being issued to the same IP address as the ticket was issued to
                if (ticketData.ip && ticketData.ip === socket.handshake.address.address) {
                    // serialize the user into the socket
                    socket.user = user;
                }
                next();
            });
        });
    }
    // continue without auth
    next();
});

io.on('connection', function (socket) {

    if (socket.user) {
        socket.emit('userdata', socket.user);
    }

});
