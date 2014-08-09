## Passport Authentication

This is a very basic example of using **scalper** with express, socket.io, and passport to do ticket based authentication.  It also uses [mongo-ticket](https://github.com/JoeWagner/mongo-ticket) to store tickets in mongodb.

###Running the app

To get it running start a mongod instance at localhost:27017, then do 
```bash
npm install
npm start
```
The express server will be running at localhost:3000.  You can use username "foo" and password "bar" to login at localhost:3000/login.html.  If you open your browser's debugger you will see the user's credentials come through the socket.io connection.
