const express = require('express');     //Import the ExpressJS Library
const app = express();
const userRouting = require('./routes/userRouting');    //Enables the USER API's
const adminRouting = require('./routes/adminRouting')   //Enables the ADMIN API's 
const restRouting = require('./routes/restRouting');    //Enables the RESTAURANTS API's
//const dishRouting = require('./routes/dishRouting');
const cartRouting = require('./routes/cartRouting');        //Enables the Cart API's functions
const myRequestLogger = require('./utilities/requestLogger')    //Imports the Request Logger to log Incoming Requests to Server
const errorLogger = require('./utilities/errorLogger');     //Imports the Error Logger to Log any Error in Executing Requests
const bodyparser = require('body-parser');      //Required to Access the Body  for POST/PUT/PATCH Requests
app.use(bodyparser.json());     //Required for The body to be parsed as a JSON File.

//app.use(bodyparser.urlencoded());

app.use(myRequestLogger);    // Calls the Request Logger
app.use('/user',userRouting);   //Bridges the User API from the URL
app.use('/admin',adminRouting);     //Bridges the Admin API from the URL
app.use('/r',restRouting)   //Bridges the Restaurant API from the URL
app.use('/cart',cartRouting);   //Bridges the Cart API
//app.use('/d',dishRouting)

app.use(errorLogger)    //Calls the Error Logger
console.log("Server Started. Running on Port 3000")
app.listen(3000);   //Opens and Loads up the Server at the Passed Port Number

module.exports = app;



/******************************************WILD CARD ROUTE JUMP***************************** */
// app.get('*',(req,res,next)=>{
//     let err = new Error();
//     err.status = 404;
//     next(err);
// })
// app.use((err,req,res,next)=>{
//     res.send("Requested Page is Not Available")
// });