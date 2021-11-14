var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../socketTutorial/test', 'index.html'));
});

//Whenever someone connects this gets executed
io.on('connection', function(socket){  
    // Send a message when
    // setTimeout(function(){
    // This(server socket) will send an event called message(built in) to our client
    //    socket.send('Sent a message 4seconds after connection!');

    // sending an object when emmiting an event
    // socket.emit('testerEvent', {description: 'A custom event named testerEvent!'});
    // }, 4000);

    //emit events from the client
   socket.on('clientEvent', function(data) {
      console.log(data);
   });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
