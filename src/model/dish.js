const connection = require('../utilities/connection');

let dishModel = {};

dishModel.getDishes=()=>{
    return connection.dishConnection.getCollection().then((collection)=>{
        return collection.find().then((data)=>{
            if(data){
                return data
            }
            else{
                console.log("Error Fetching Data")
            }
        })
    })
}

dishModel.addDish = (dishObj) =>{
    return connection.dishConnection.getCollection().then((collection)=>{
        return collection.create(dishObj).then((data)=>{
            if(data){
                return data
            }
            else{
                console.log('error adding dish to collection')
            }
        }).catch((err)=>{
            throw err;
        })
    })
}

dishModel.deleteDish=(dishname)=>{
    return connection.dishConnection.getCollection().then((collection)=>{
        return collection.deleteOne({name:dishname}).then((data)=>{
            if(data){
                return data
            }
            else{
                console.log("error deleting data")
            }
        }).catch((err)=>{
            throw err;
        })
    })
}



//module.exports = dishModel;