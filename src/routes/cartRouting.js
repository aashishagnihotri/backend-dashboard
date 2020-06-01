const service = require('../services/cartService');

const express = require('express');
const routing = express.Router();

routing.get('/get',(req,res,next)=>{
    let emailId = req.body.email;
    service.getCart(emailId).then((data)=>{
        if(data){
            res.send(data);
            res.status(201);
        }
    }).catch((err)=>{
        throw err;
    })
})

routing.post('/add',(req,res,next)=>{
    let emailId = req.body.email;
    let orders = req.body.orders;
    console.log(emailId,orders,"At Routing");
    service.add(emailId,orders).then((data)=>{
        res.send(data);
        res.status(201);
    }).catch((err)=>{
        throw(err);
    })
})

routing.delete('/delete',(req,res,next)=>{
    service.delete(req.body.email,req.body.dish).then((data)=>{
        res.send(data);
        res.status(201);
    }).catch((err)=>{
        throw err;
    })
})


module.exports = routing;