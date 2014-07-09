
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var Scalper = require('../../index');
var app = express();

var userStore = require('./user-store');

var scalper = new Scalper({
    store: require('./ticket-store'),
    // authenticate function called by the middleware
    authenticate: function (req) {
        return (req.user && req.user.id) ? {userId: req.user.id, ip: req.ip} : false;
    }
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(scalper.issueTickets());



// ------ setup passport stuff ------

passport.use(new LocalStrategy(
  function(username, password, done) {
    // check creds
    userStore.findByUsername(username, function (err, user) {
        if (err) return done(err);
        if (user && password === user.password) {
            return done(null, user);
        }
        done();
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    userStore.findById(id, function (err, user) {
        if (err) return done(err);
        if (user) {
            return done(null, user);
        }
        done();
    });
});


// routing as usual
app.post('/login', passport.authenticate('local', { failureRedirect: '/login.html', successRedirect: '/' }));

// more routes...

var server = http.Server(app);
server.listen(3000);

