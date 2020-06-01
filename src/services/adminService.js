/*Imports the Admin Model File to Access the CRUD Operations */
const dblayer = require('../model/admin');

/* Creates a Service Object which will Hold All the methods for the 
Service Layer Business Lofic Operations */

const service = {};


service.getFeedback = () =>{
    return dblayer.getFeedback().then((data)=>{
        return data
    }).catch((err)=>{
        throw err;
    })
}

service.findFeedback = (email) =>{
    return dblayer.findFeedback(email).then((data)=>{
        return data
    }).catch((err)=>{
        throw err;
    })
}

/* This Method helps to Fetch the Admin Object Login credentials and to match them with the input
 login credentials to verify if the Admin Credentials are a dot match and then enable them to login  */

service.validateLogin = (loginObj) =>{
    let emailId = loginObj.email;
    let password = loginObj.password;
    return dblayer.validateLogin(emailId).then((adminObj)=>{
        if(!adminObj){
            let err = new Error("Admin Does Not Exist. Check Credentials");
            err.status = 401;
            return err;
        }
        else if(adminObj.password !== password){
            let err = new Error("Please Check Password");
            err.status = 401;
            return err;
        }
        else{
            return true;
        }
    })
}

/* This Exports the Service Object in order for the routing layer to access Service Layer
 Business Logic Functions and Operations */

module.exports = service;