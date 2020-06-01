let models = require('../model/cart');

let service = {};

service.getCart = (emailId) =>{
    return models.getCart(emailId).then((data)=>{
        if(data){
            return data;
        }
    }).catch((err)=>{
        next(err);
    })
}
service.delete = (emailId,dish) =>{
    return models.delete(emailId,dish).then((data)=>{
        if(data){
            return data;
        }
    }).catch((err)=>{
        throw err
    })
}

service.add = (email,orders) =>{
    console.log(email,orders,"At Service");
    return models.add(email,orders).then((data)=>{
        if(data){
            console.log(data,"return At Service")
            return data
        }
        else{
            return ("Error Upserting Cart")
        }
    }).catch((err)=>{
        next(err)
    })
}

module.exports = service;