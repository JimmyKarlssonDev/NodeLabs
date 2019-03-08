const fs = require('fs');
const path = require('path')
const dirname = path.join(__dirname, 'files');
const ms1Day= (24*60*60*1000)/1000 
const files = fs.readdirSync(dirname);

files.forEach(file => {
    const filePath = path.join(dirname, file);
    fs.stat(filePath, (err, stats) => { 
        if(err) throw err;
        
        const date = Date.now() - stats.mtime.getTime();
        if(date > 7 * ms1Day ){
            fs.unlink(filePath, (err)=> {
              if(err) throw err;                    
              console.log(`${filePath} was deleted...`)
            })                
        }  
    });
});