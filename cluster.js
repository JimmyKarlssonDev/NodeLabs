const cluster = require('cluster');
const os = require('os');

if(cluster.isMaster){
    const cpuCount = os.cpus().length
    
    for(let i=0;i<cpuCount;i++){
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal)=> {
        if(code !==0 && !worker.exitedAfterDisconnect){
            console.log(`Worker ${worker.id} crashed. `+
                        'Starting new worker...')
          cluster.fork();
        }
    });
   
}else{
    
    require('./server');
}
