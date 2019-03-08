const si = require('systeminformation');




si.networkInterfaces((data, err)=> {
    console.log(data);
})