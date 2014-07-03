scalper
=======

A ticket store designed to allow an application to use an express app to do auth for a socket.io app

Setup
=====

See `example/passport-auth/` for basic usage with express 4, passport, and socket.io.  Notice the socket.io server and the express server are completely separated.  They could potentially be hosted on separate domains without issue.
Worth noting that the example uses http for simplicity, but its recommended to use https.

Motivation
==========

There are many advantages for token based authentication when using websockets.
Heroku docs have a [nice article](https://devcenter.heroku.com/articles/websocket-security) outlining some of the details of securing websockets.
[authO.com](https://auth0.com/blog/2014/01/15/auth-with-socket-io/) has a blog post that also goes over the details of token based auth with socket.io
