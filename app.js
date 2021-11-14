var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../socketTutorial/test', 'index.html'));
});

var clients = 0;

// broadcast ver1
// broadcast the number of connected clients to all the users.
// io.on('connection', function(socket){  
//     clients++;
//     io.sockets.emit('broadcast', { description: clients + ' clients connected'});
//     socket.on('disconnect', function () {
//         clients--;
//         io.sockets.emit('broadcast', { description: clients + ' clients connected'});
//     });
// });

// broadcast ver2
// send the new user a welcome message and update the other clients about him/her joining.
// on connection of client send him a welcome message and broadcast connected client number to all others.
io.on('connection', function(socket){
    clients++;
    socket.emit('newclientconnect', {description : 'Hey, welcome!'});
    socket.broadcast.emit('newclientconnect', {description : clients + ' clients connected'})
    socket.on('disconnect', function() {
        clients--;
        socket.broadcast.emit('newclientconnect', {description : clients + ' clients disconnected'})
    });
});

http.listen(3000, function() {
    console.log('listening on localhost:3000');
});


