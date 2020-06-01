/*Imports all the Necessary files and Libraries */

const express = require('express');     //Importing the ExpressJS Library
const routing = express.Router();       //Assigning the Routing Method to the variable
const models = require('../model/admin');       //Importing the User Model for CRUD 
const adminTemplate = require('../model/adminClass')       //Importing the template for Proper Assignment of the Admin Object from the Template
const adminService = require('../services/adminService');       //Importing the Service Functions for Business Logic


routing.get('/feedback',(req,res,next)=>{
    return adminService.getFeedback().then((data)=>{
        res.send(data);
        res.status(201);
    }).catch((err)=>{
        throw err;
    })
})

routing.get('/findFeedback',(req,res,next)=>{
    let email = req.body.email;
    return adminService.findFeedback(email).then((data)=>{
        res.send(data);
        res.status(201);
    }).catch((err)=>{
        throw err;
    })
})
/*This Route Helps to Update an admin's details  */

routing.patch('/update',(req,res,next)=>{
    let adminObj = new adminTemplate(req.body);
    return models.updateAdmin(adminObj).then((data)=>{
        if(data){
            res.send(data);
            res.status(201)
        }
    }).catch((err)=>{
        next(err)
    })
})

/* This is the Route to Validate Login for Credential Check and also,
keeps a TimeStamp for The Login Details into the Portal */

routing.post('/login',(req,res,next)=>{
    let adminObj = req.body;
    return adminService.validateLogin(adminObj).then((data)=>{
        if(data){
            res.json({message:`${data}`})
            res.status(200);
        }
    }).catch((err)=>{
        throw err;
    })
})

/*This Route helps the Super Admin to fetch all the Admin Details from the Admin Collection */

routing.get('/get',(req,res,next)=>{
    let adminObj = req.body;
    return models.getAdmin(adminObj).then((data)=>{
        if(data){
        res.send(data)}
        else{
            console.log('no data found')
        }
    })
})

/*This Routing Method adds an Admin into the Dashboard so that they can 
avail all the services from the dashboard */

routing.post('/add',(req,res,next)=>{
    let adminObj = req.body;
    models.add(adminObj).then((data)=>{
        res.send(data)
        res.status(201)
    }).catch((err)=>{
        next(err)
    })
})

/* This route Helps to Delete an Admin from the Users Collection */

routing.delete('/delete',(req,res,next)=>{
    let adminObj = req.body;
    models.delete(adminObj).then((data)=>{
        res.send(data);
        res.status(201);
    }).catch((err)=>{
        next(err);
    })
})

/*Exports the Routing to the App.js and extends the Services fom the Server Side */
module.exports = routing;