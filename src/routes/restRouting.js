/*Import all Required files and Libraries */

const express = require('express');     //Import Express JS
const routing = express.Router();       //Call the Router Method from the ExpressJS Library
const models = require('../model/restaurant');      //Import the Restaurant model for the methods
const service = require('../services/restService');     //Import the Services to Access the Service Manipulation methods
const dishTemplate = require('../model/dishClass');     //Import the Dish template to set the Body Objects to the template

/*This Route helps  to fetch all the Restaurant Details from the Restaurant Collection */ 

routing.get('/getAll',(req,res,next)=>{
return models.getAll().then((data)=>{
    if(data){
        res.send(data);
        res.status(201);
    }
    
})
})

/*This Route fetches the dish from the dishname passed as a body */

routing.get('/getDish',(req,res,next)=>{
    let dishname = req.body.dishname;
    return service.getDish(dishname).then((data)=>{
        if(data){
            console.log("returning data from search");
            res.send(data);
            
        }
        else{
            console.log('no data returned')

        }
    })
})

/*This route fetches the dish from the dish name and the restaurant name and returns the dish having the dishname 
 in a Restaurant Name with the restname */

routing.get('/getRD',(req,res,next)=>{
    let dishname = req.body.dishname;
    let restname = req.body.restname;
    return service.getRestDish(dishname,restname).then((data)=>{
        if(data){
            res.send(data);
            res.status(201)
        }
    }).catch((err)=>{
        throw err;
    })
})

/* This route fetches the Dish object with the name of dishname */

routing.get('/getSD',(req,res,next)=>{
    let dishname = req.body.dishname;
    return service.getSpecificDish(dishname).then((data)=>{
        if(data){
            res.send(data)
            res.status(201)
        }
    }).catch((err)=>{
        throw err;
    })
})

routing.get('/sortRestOpen',(req,res,next)=>{
    let sortOrder = req.body.order;
    return models.sortRestOpen(sortOrder).then((data)=>{
        if(data){
            res.send(data)
        }
        else{
            console.log("error returning data to the routing")
        }
    }).catch((err)=>{
        throw err;
    })
})

routing.get('/sortRestName',(req,res,next)=>{
    let sortOrder = req.body.order;
    return models.sortRestName(sortOrder).then((data)=>{
        if(data){
            res.send(data)
        }
        else{
            console.log("error returning data to the routing")
        }
    }).catch((err)=>{
        throw err;
    })
})

routing.get('/sortRestLocation',(req,res,next)=>{
    let sortOrder = req.body.order;
    return models.sortRestLocation(sortOrder).then((data)=>{
        res.send(data)
        res.status(201)
    }).catch((err)=>{
        throw err;
    })
})


routing.get('/getDishByRestaurant',(req,res,next)=>{
    let restname = req.body.name;
    return service.getDishByRestaurant(restname).then((data)=>{
        if(data){
            console.log('data returning from services')
            res.send(data);
            res.status(201);
        }
        else{
            console.log("No data returned to routes");
        }
    })
})

routing.get('/getMultipleDish',(req,res,next)=>{
    let dishArr = req.body.dishes;
    console.log(dishArr);
    
    return service.getMultipleDish(dishArr).then((data)=>{
        if(data){
            console.log("data returning to routing",data)
            res.send(data)
        }
    }).catch((err)=>{
        console.log('error thrown')
        throw err;
    })
})



routing.post('/addRestaurant',(req,res,next)=>{
    let restObj = req.body;
    return models.addRestaurant(restObj).then((data)=>{
        if(data){
            res.send(data)
            res.status(200)
        }
        else{
            console.log('error fetching data')
        }
    })
})

routing.delete('/delete',(req,res,next)=>{
    let name = req.body.name;
    models.deleteRestaurant(name).then((data)=>{
        if (data){
            res.send(data);
            res.status(200)
        }
        else{
            console.log('error at routing');
        }
    }).catch((err)=>{
        throw err;
    })
})

routing.patch('/update',(req,res,next)=>{
    let restObj = req.body;
    models.updateRestaurant(restObj).then((data)=>{
        if(data){
            res.send(data)
            res.status(200)
        }
        else{
            console.log('error at routing update')
        }
    }).catch((err)=>{
        throw err;
    })
})



module.exports = routing;