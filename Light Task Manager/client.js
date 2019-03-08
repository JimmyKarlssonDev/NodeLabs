
const EventEmitter = require('events');
const readline = require('readline');

//Intefrace for user input and output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Eventemitter for the client to be able to emit events
const client = new EventEmitter();

//initialize the server with a client object
const server = require('./server')(client);

//When response comes from server, clear terminal and prompt user for more input
server.on('response', (response) => {
  process.stdout.write('\u001B[2J\u001B[0;0f');
  process.stdout.write(response);
  process.stdout.write('\n\> ');  
}); 

let command, args;

//Listen for the 'line' event when the user inputs a command
//Split command to be able to handle the args correctly
rl.on('line', (input) => {
  [command, ...args] = input.split(' ');
  client.emit('command', command, args);
});
