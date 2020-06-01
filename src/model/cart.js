const connection = require('../utilities/connection');

const cartModel = {};

cartModel.getCart = (emailId) =>{
    return connection.cartConnection.getCollection().then((collection)=>{
        return collection.find({email:emailId},{_id:0}).then((data)=>{
            if(data){
                return data;
            }else{
                return ("Some Error Occured");
            }
        }).catch((err)=>{
            next(err);
        })
    })
}

cartModel.add = (emailId,dish) =>{
    console.log(email,dishes,"Input at Models")
    return connection.cartConnection.getCollection().then((collection)=>{
        collection.updateOne({email:emailId},{orders:dish},{upsert:true}).then((data)=>{
            if(data){
                console.log(data,'Return at Models')
                return data
            }
        }).catch((err)=>{
            next(err)
        })
    })
}

cartModel.delete = (emailId,dish) =>{
    return connection.cartConnection.getCollection().then((collection)=>{
        collection.deleteOne({email:emailId},{orders:dish}).then((data)=>{
            if(data){
                return data
            }else{
                return ("Some error Occured");
            }
        }).catch((err)=>{
            throw err
        })
    })
}

module.exports = cartModel;