/*Imports the User Model File to Access the CRUD Operations */
let dbLayer = require('../model/users');

/* Creates a Service Object which will Hold All the methods for the 
Service Layer Business Lofic Operations */

let service = {};

/* This Method helps to Fetch the User Object Login credentials and to match them with the input
 login credentials to verify if the User Credentials are a dot match and then enable them to login  */

service.addFeedback = (feedbackObj)=>{
    return  dbLayer.addFeedback(feedbackObj).then((data)=>{
        if(data){
            return data
        }
    }).catch((err)=>{
        throw err;
    })
}

service.validateLogin = (loginObj) =>{
    let emailId = loginObj.email;
    let password = loginObj.password;
    return dbLayer.validateLogin(emailId).then((userObj)=>{
        if(!userObj){
            
            let err = new Error('User with this Username Does not Exist');
            err.status = 401;
            throw err;
        }
        else if(userObj.password !== password){
            let err = new Error('Incorrect Password. Please Try Again..');
            err.status = 401;
            throw err;
        }
        else{
            console.log('Returning data',userObj.email,userObj.password,emailId,password)
            return true
        }
        
    }).catch((err)=>{
        throw err;
    })
}

/* This Exports the Service Object in order for the routing layer to access Service Layer
 Business Logic Functions and Operations */
 
module.exports = service;