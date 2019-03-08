const http = require('http');
const processId = process.pid;

http.createServer((req, res)=> {
    for(let i=0;i<1e9;i++);
    res.write(`Handeled by process ${processId}`)
}).listen(8080, () => {
    console.log(`Started process ${processId}`);
});

setTimeout(() => {
    process.exit(1)
}, Math.random() * 10000)


