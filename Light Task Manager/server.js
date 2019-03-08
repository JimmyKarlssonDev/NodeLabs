const EventEmitter = require('events');
const fs = require('fs');
const filePath = './temp'
const uuidv1 = require('uuid/v1');


class Server extends EventEmitter{  
  constructor(client){
    super();
    //Create a tasks object to hold taskinfo
    this.tasks = {};
    //Unique task id for the task
    this.taskId = 1;
    //Emit a response event to client to display something for the user initally
    //In a nexttick, otherwise it wouldn't be displayed
    process.nextTick(() => {
      this.emit(
      'response', 
      'Type a command (help to list commands)')
    });    

    //Listen to the command event from client, handle commads diferrently in the swithc statement
    client.on('command', (command, args) => {
      switch(command){
        case 'help':
        case 'add':
        case 'ls':
        case 'delete':
        case 'export' :
          this[command](args);
          break;
        default:
        this.emit('response', 'Unknown Command')
      }       
    });
  }

  //Display and prettyfy the tasks for the user
  tasksString(){
    return Object.keys(this.tasks).map(key => {
      return `${key}: ${this.tasks[key]}`;
    }).join('\n');
  }

  //Display available commands
  help(){
    this.emit('response', `Available Commands:
add task
ls
delete: id
export`
    );
  }

  //Add the task in the tasks object
  //Emit response back to the client
  add(args){
    this.tasks[this.taskId] = args.join(' ');
    this.emit('response', `Added task ${this.taskId}`)
    this.taskId++;
  }

  //List all addaed tasks with the tasksString() method
  ls(){
    this.emit('response', `Tasls_\n${this.tasksString()}`)
  }

  //delete the task from the tasks object
  delete(args){
    delete(this.tasks[args[0]]);
    this.emit('response', 'delete ...')
  }

    //export tasks to file 
    export(){   
    console.log('exporting...')

    var file = uuidv1();

    console.log(file);

    fs.appendFile(`${file}.txt`, this.tasksString(), function (err) {
      if (err) throw err;
      console.log(`Current tasks exported to ${file}.txt`);
    });  

    this.emit('response', 'export...')
    }
}

//Export the server with a client input
module.exports = (client) => new Server(client);
