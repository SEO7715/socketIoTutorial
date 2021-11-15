var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../socketTutorial/test', 'index.html'));
});

//create custom namespace basic ver
// var nsp = io.of('/my-namespace');
// nsp.on('connection', function(socket) {
//   console.log('someone connected');
//   nsp.emit('hi', 'Hello everyone!');
// });

const namespace1 = io.of('/namespace1');
// connection을 받으면, news 이벤트에 description 객체를 담아 보낸다
namespace1.on('connection', (socket) => {
  namespace1.emit('news', { description : "someone connected at namespace1"})
});


const namespace2 = io.of('/namespace2');
namespace2.on('connection', (socket) => {
  namespace2.emit('news', { description : "someone connected at namespace2"})
});

http.listen(3000, function() {
    console.log('listening on localhost:3000');
});


