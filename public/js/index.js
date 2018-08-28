 //initiate client to server request to open up a web socket
 var socket = io();

 //use function, not arrow for cross browser fucntionality. 
 socket.on('connect', function () {
     console.log("client connected to server");
 })

 socket.on('disconnect', function() {
     console.log("server connection dropped");
 })

 socket.on('newMessage', function(message) {
    console.log("new Message", message);
})

socket.on('userJoined', function(message) {
    console.log("userJoined", message);
})

socket.on('welcome', function(message) {
    console.log("welcome", message);
})