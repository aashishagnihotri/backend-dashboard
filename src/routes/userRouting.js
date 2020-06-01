/*Imports all the Necessary files and Libraries */

const express = require('express');     //Importing the ExpressJS Library
const routing = express.Router();      //Assigning the Routing Method to the variable
const models = require('../model/users')    //Importing the User Model for CRUD 
const userTemplate = require('../model/userClass')  //Importing the template for Proper Assignment of the User Object from the Template
const userService = require('../services/userService');     //Importing the Service Functions for Business Logic

/*This routes the Request to Insert User Data into the Collection */
routing.get('/insertUsers', (req,res,next)=>{
    models.insertScript().then((data)=>{
        if(data){
            res.status(201)
            res.json({"message":"Inserted" + data + "Documents"})
        }
    })
})

routing.post('/feedback',(req,res,next)=>{
    models.addFeedback(req.body).then((data)=>{
        res.send(data);
        res.status(201)
    }).catch((err)=>{
        throw err;
    })
})

/* This is the Route to Validate Login for Credential Check and also,
keeps a TimeStamp for The Login Details into the Portal */

routing.post('/login',(req,res,next)=>{
    let loginObj = req.body;
    userService.validateLogin(loginObj).then((data)=>{
        console.log('data returning to routing post validation')
        res.send(data);
        res.status(201);
    }).catch((err)=>{
        next(err);
    })
    
})

/*This Method Helps fetch an Account with a Specific Username */

routing.get('/get/:username',(req,res,next)=>{
    let uName = req.params.username
    models.getUser(uName).then((data)=>{
        res.status = 202
        res.json({data})
    }).catch((err)=>{
        next(err)
    })
})

/*This Routing Method adds / registers a user into the Dashboard so that they can 
avail all the services from the dashboard */

routing.post('/adduser',(req,res,next)=>{
    let userObj = req.body;
    models.addUser(userObj).then((data)=>{
        res.json({message:"User Account Created Successfully"})
    }).catch((err)=>{
        next(err)
    })
})

/*This Route helps the Admin to fetch all the User Details from the users Collection */

routing.get('/getAll',(req,res,next)=>{
    models.getAllUsers().then((data)=>{
        res.json(data);
        res.status = 202;
    })
})

/*This Route Helps to Update a user's details  */

routing.patch('/updateUser',(req,res,next)=>{
    let userObj = new userTemplate(req.body);
    //console.log(userObj.email,userObj,"\nRouting")
    models.updateUser(userObj).then((data)=>{
        //console.log(data,"\nReturn to Routing");
        res.send(data)
    }).catch((err)=>{
        next(err);
    })
})

/* This route Helps to Delete a user from the Users Collection */
routing.delete('/delete/:email',(req,res,next)=>{
    let username = req.params.email
    models.deleteUser(username).then((data)=>{
        res.json({data})
    }).catch((err)=>{
        next(err);
    })
})

/*Exports the Routing to the App.js and extends the Services fom the Server Side */

module.exports = routing;