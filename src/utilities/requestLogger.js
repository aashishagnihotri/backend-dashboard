/*Imports All the Necessary Required Modules */
const fs = require('fs');
const RequestLogger = (req,res,next) =>{
console.log("Request Method is", req.method)//Prints the Method of the Route to the Console
console.log("Request URL is ",req.url)//Prints the URL to the Console

let logMessage = `${new Date().toDateString()} - ${req.method} : ${req.url}\n;` //This Data is logged into the log file
fs.appendFile('RequestLogger.txt',logMessage,(err)=>{
    if(err){
        return next(err)
    }
})
next();
}
/* This exports the Log Details to be called */
module.exports = RequestLogger;