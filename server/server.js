require('./../config/config');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var express = require('express');
var socketIO = require('socket.io');
const port = process.env.PORT;

const http = require('http'); //built in
const path = require('path'); //built in

const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app); //using http server not express
var io = socketIO(server);
var users = new Users();

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.on('join', (obj, callback) => {
        
        if(!isRealString(obj.params.name) || !isRealString(obj.params.room)){
            callback('name and room name are required');
        }

        socket.join(obj.params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,obj.params.name, obj.params.room);
        
        io.to(obj.params.room).emit('updateUserList', users.getUserList(obj.params.room));
        
        socket.emit('newMessage',generateMessage('Admin', 'Welcome to chat'))
        socket.broadcast.to(obj.params.room).emit('newMessage',generateMessage('Admin', `${obj.params.name} joined the room`))        

        
        //socket.leave(obj.params.room);
        //io.emit --> io.to('room name').emit
        //socket.broadcast.emit --> socket.broadcast.to('room name').emit
        //socket.emit

        callback();
    })

    socket.on('createMessage', function (message, callback) {
        var user = users.getUser(socket.id);
        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name, message.text))
        }
        //io emits to all connections.
        //socket emits to this one socket connection
        //broadcast sends to all but self
        
        
        //acknowledge receipt
        callback();  
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name, `${coords.latitude}, ${coords.longitude}`))
        }
    })

    socket.on('disconnect', () => {
        console.log("client connection dropped");
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    })
})

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`server started on ${port}`);
});