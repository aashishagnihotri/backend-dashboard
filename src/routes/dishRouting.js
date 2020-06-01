const express = require('express');
const router = express.Router();
const models = require('../model/dish');
const dishTemplate = require('../model/dishClass')

router.get('/getAll',(req,res,next)=>{
    models.getDishes().then((data)=>{
        if(data){res.send(data);
        res.status(200);}
    }).catch((err)=>{
        throw err;
    })
})

router.post('/addDish',(req,res,next)=>{
    let dishObj = new dishTemplate(req.body)
    models.addDish(dishObj).then((data)=>{
        if(data){
            res.send(data)
            res.status(200)
        }
        else{
            console.log(data)
        }
    }).catch((err)=>{
        throw err
    })
})

router.delete('/delete',(req,res,next)=>{
    let dishname = req.body.name;
    models.deleteDish(dishname).then((data)=>{
        if(data){
            res.send(data)
            res.status(200)
        }
    }).catch((err)=>{
        throw err;
    })
})



//module.exports = router;