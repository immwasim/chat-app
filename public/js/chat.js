//initiate client to server request to open up a web socket
var socket = io();

function scrollToBottom(){
    var messages = $('#message');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight')
    var scrollTop = messages.prop('scrollTop')
    var scrollHeight = messages.prop('scrollHeight')
    var newMessageHeight = newMessage.innerHeight;
    var lastMessageHeight = newMessage.prev().innerHeight;

    if((clientHeight + scrollTop + newMessageHeight + lastMessageHeight) >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

//use function, not arrow for cross browser fucntionality. 
socket.on('connect', function () {
    
    var params = jQuery.deparam(window.location.search);
    socket.emit('join', {params}, function (err){
        if(err){
            alert(err);
            window.location.href = '/';
        }else{
            console.log("no error");
        }
    })
})

socket.on('disconnect', function () {
    console.log("server connection dropped");
})

socket.on('updateUserList', function (users){
    //console.log('User list',users);
    var ol = jQuery('<ol></ol>');
    users.forEach(function(user){
        ol.append(jQuery('<li></li>').text(user));
    })
    jQuery('#users').html(ol);
})

socket.on('newMessage', function (message) {
    //console.log("new Message", message);
    var formattedTime = moment(message.createdAt).format('h:mm a')
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text:message.text,
        from:message.from,
        createdAt: formattedTime
    })

    jQuery('#messages').append(html);
    scrollToBottom();
})

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a')
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        url:message.url,
        from:message.from,
        createdAt: formattedTime
    })

    jQuery('#messages').append(html);
    scrollToBottom();
})

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    var txtMessage =  jQuery('[name=message]')

    socket.emit('createMessage',
    {
        text: txtMessage.val()
    }, function (data) {
        txtMessage.val('');
    });
})

var locationButton = $('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('No geo in your browser');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text("Send Location");
        socket.emit('createLocationMessage', {
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        })
    }, function (){
        locationButton.removeAttr('disabled').text("Send Location");;
        alert('user denied permissions');
    });
});