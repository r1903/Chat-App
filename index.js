const express = require('express');
const socket = require('socket.io');
const app = express();
const port = process.env.PORT || 3000

const server = app.listen(port);

//serving the static files
app.use(express.static('public'));

//setting socket io
const io = socket(server);

io.on('connection',function(socket){
    socket.emit('welcome','welcome to chatroom')
    //listening for sending chat message event
    socket.on('chat',function(data){
    io.sockets.emit('chat',data);
    });
  //listening for typing chat message event 
    socket.on('typing',function(data){
       socket.broadcast.emit('typing',data);
    });

});