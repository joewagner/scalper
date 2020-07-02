scalper
=======

A ticket store designed to allow an application to use an express app to do auth for a socket.io app.  compatible with Express 4

Installation
============

`npm install scalper`

Options
=======

 - `authenticate` - Function that checks if current request is authenticated. It is passed the request object, and should return the value that will be stored in the ticket. (default checks `req.user._id` and `req.user.id`)
 - `genTicket` - Function that returns the ticket. (default uses the `node-uuid` `v4` method)
 - `route` - String that represents the GET route that will serve tickets. (default is '/socket-ticket')
 - `store` - an instance of a ticket store. (default is a [memory-store](https://github.com/JoeWagner/scalper/blob/master/memory-store.js) instance)

Store Option
============

*Note:* The default memory store should not be used in production.
A store should expose a `get` and a `set` method.
`set` should take three arguments. A key, a value, and a callback. The store implementation should ensure the uniqueness of tickets
`get` should take two arguments. A key and a callback.
*Important* `get` should delete the ticket as soon as its retrieved, so that tickets can not be used twice.

Look at [redis-ticket](https://github.com/JoeWagner/redis-ticket) for an example implementation with mongodb.

Motivation
==========

There are many advantages for token based authentication when using websockets.
Heroku docs have a [nice article](https://devcenter.heroku.com/articles/websocket-security) outlining some of the details of securing websockets.
[authO.com](https://auth0.com/blog/2014/01/15/auth-with-socket-io/) has a blog post that also goes over the details of token based auth with socket.io
