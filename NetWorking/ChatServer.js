
const server = require('net').createServer();
let counter = 0;
let sockets = {};

//Format the date
function timeStamp(){
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}`;
}

//React on connection to server
server.on('connection', socket => {
  socket.id = counter++;  

  console.log('Client connected');
  socket.write('Enter username:');

  socket.on('data', data => {
    //First entry should be username, react to that and return.
      if(!sockets[socket.id]){
        socket.name = data.toString().trim();
        socket.write(`Welcome ${socket.name}!\n`)
        sockets[socket.id] = socket;
        return;
      }

      //Capture unse entries, loop the sockets
    Object.entries(sockets).forEach(([key, cs]) => {
        if(socket.id == key) return //Do not display chat message to the sender
      
      //Write message to all other sockets, incl sender user name and timestamp
      cs.write(`${socket.name}: ${timeStamp()}: `);
      cs.write(data);
    });
  });

  //On disconnect, remove socket
  socket.on('end', () => {
    delete sockets[socket.id];
    console.log('Client disconnected');
  });
});

//Listen to incoming connections to port 8000.
server.listen(8000, () => console.log('Server bound'));