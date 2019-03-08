const { Readable } = require('stream');

const inStream = new Readable({
    read(size){
        setTimeout(() => {
            this.push(String.fromCharCode(this.currentCharCode++));
            if(this.currentCharCode > 90){
                this.push(null)
            }
        }, 100);       
    }
});


inStream.currentCharCode = 65;
inStream.pipe(process.stdout);

process.on('exit', () => {
    console.error(`\n\ncurrentCharCode is ${inStream.currentCharCode}`)
})

process.stdout.on('error', process.exit);