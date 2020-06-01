/*Imports the FS Library to enable Read-Write to files */

const fs = require('fs');

let logger = (err,req,res,next) =>{
if(err){
    /*Only Writes the Error with timestamps if found any during the Route Execution */
    fs.appendFile('ErrorLogger.txt',new Date().toDateString() + ":" + err.stack + "\n",(error)=>{
        if(error){
            console.log("logging error failed")
        }
    });
    if(err.status){
        res.status = err.status;
    }
    else{
        res.status = 500;
    }
    res.json({"message":err.message})
}
next();
}

module.exports = logger;