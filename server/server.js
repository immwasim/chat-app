require('./../config/config');
const {generateMessage} = require('./utils/message');

var express = require('express');
var socketIO = require('socket.io');
const port = process.env.PORT;

const http = require('http'); //built in
const path = require('path'); //built in

const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app); //using http server not express
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('welcome',generateMessage('Admin', 'Welcome to chat'))

    socket.broadcast.emit('userJoined',generateMessage('Admin', 'New user joined'))

    socket.on('createMessage', function (message) {
        console.log('createMessage', message);
        //io emits to all connections.
        //socket emits to this one socket connection
        io.emit('newMessage',generateMessage(message.from, message.text))

        //broadcast to all but the sender socket
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    });

    socket.on('disconnect', () => {
        console.log("client connection dropped");
    })
})

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`server started on ${port}`);
});