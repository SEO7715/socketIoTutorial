var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../socketTutorial/test', 'index.html'));
});

// joining Rooms
var roomno = 1;
io.on('connection', function(socket) {
  socket.join("room-" + roomno);
  // send this event to everyone in the room
  io.sockets.in("room-" + roomno).emit('connectToRoom', "You are in room no. " + roomno);

  // socket.leave("room-"+roomno);

});

http.listen(3000, function() {
    console.log('listening on localhost:3000');
});


