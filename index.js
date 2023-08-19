const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname+'/public'));
const users={};

io.on('connection',socket=>{
  socket.on('new-user-joined',name=>{
    // console.log(name);
    users[socket.id]=name;
    socket.broadcast.emit('user-joined',name)
  })

 socket.on('message',message=>{
  socket.broadcast.emit('received',{message:message,name:users[socket.id]})
 })

 socket.on('disconnect',message=>{
  socket.broadcast.emit('user-disconnect',users[socket.id]);
  delete users[socket.id];
 })
})





http.listen(3000, () => {
  console.log('Server started on port 3000');
});