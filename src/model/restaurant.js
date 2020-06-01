/*Imports the Connection to the database */
const connection = require('../utilities/connection')
/*Creates an Empty Object to store methods to fetch and manipluate data from the Database */
let restModel = {};

/*getAll() fetches the all the restaurants with their offerings */

restModel.getAll = () => {
    return connection.rConnection.getCollection().then((collection)=>{
        return collection.find().then((data)=>{
            if(data){
                return data
            }
            else{
                console.log('no combined data fetched')
            }
        }).catch((err)=>{
            throw err;
        })
    })
    
}

restModel.getMultipleDish = (dishname) =>{
    return connection.rConnection.getCollection().then((collection)=>{
        return collection.find({"dishes.name":dishname},{_id:0,"dishes.name":1,"dishes.price":1})
    }).then((data)=>{
        if(data){
            console.log("Hello")
            //console.log("data returned to models",data)
            return data
        }
        else{
            return ("encountered errors")
        }
    }).catch((err)=>{
        next(err)
    })
}

/*sortRestOpen (sort Order) takes the sorting order input in form of -1/+1 or "desc"/"asc" in order to sort
 all the restaurants and their offerings based on whether they are open or closed in the Sort Order Mentioned  */

restModel.sortRestOpen = (sortOrder) =>{
    return connection.rConnection.getCollection().then((collection)=>{
        return collection.find().sort({open:sortOrder}).then((data)=>{
            return data;
        })
    }).catch((err)=>{
        next(err);
    })
}

/*sortRestLocation(sort Order) takes the sorting order input in form of -1/+1 or "desc"/"asc" in order to sort
 all the restaurants and their offerings based on Location Names in the Sort Order Mentioned  */

restModel.sortRestLocation = (sortOrder) =>{
    return connection.rConnection.getCollection().then((collection)=>{
        return collection.find().sort({location:sortOrder}).then((data)=>{
            return data;
        }).catch((err)=>{
            next(err)
        })
    })
}

/*sortRestName(sort Order) takes the sorting order input in form of -1/+1 or "desc"/"asc" in order to sort
 all the restaurants and their offerings based on Restaurant Names in the Sort Order Mentioned  */

restModel.sortRestName = (sortOrder) =>{
    return connection.rConnection.getCollection().then((collection)=>{
        return collection.find().sort({name:sortOrder}).then((data)=>{
            return data;
        })
    }).catch((err)=>{
        next(err);
    })
}

/*getSpecificDish (dishname) looks for a Dish with the name as the dishname and then returns the Dishes Array 
from the Restaurants which contain the dish. The Rest of the Manipulation is done in the Service layer to send data 
in accordance with the requirement */

restModel.getSpecificDish = (dishname) =>{
return connection.rConnection.getCollection().then((collection)=>{
    return collection.find({"dishes.name":dishname },{_id:0,"dishes.name":1,"dishes.price":1}).then((data)=>{
        if(data){
            return data
        }
    }).catch((err)=>{
        next(err);
    })
})
}

/*getRestDish (dishname,restname) is a method that searches for a dish that matches a Dish Name in a Document 
whhich has a restaurant name that matches the restname and return the price ,name of the dish */

restModel.getRestDish = (dishname,restname) =>{
    return connection.rConnection.getCollection().then((collection)=>{
        return collection.find({"dishes.name":dishname,name:restname },{_id:0,name:1,"dishes.name":1,"dishes.price":1}).then((data)=>{
            //console.log(data,'fetching data from database')
            return data;
        }).catch((err)=>{
            next(err);
        })
    })
    }

/* getDish(dishname) looks for the dishes with the dishname and returns an array of dish objects which can be used
 for any manipulations in the service layer */

restModel.getDish = (dishname)=>{
return connection.rConnection.getCollection().then((collection)=>{
    return collection.find({"dishes.name":{$all:dishname}},{_id:0,"dishes.name":1,"dishes.price":1,"dishes.available":1}).then((data)=>{
        //console.log(data)
        return data
        
        }).catch((err)=>{
            throw err;
        })
    })
}

/*getDishByRestaurant (restname) is a method that looks for a restaurant and returns data for the Restaurant */

restModel.getDishByRestaurant = (restname) =>{
    return connection.rConnection.getCollection().then((collection)=>{
        return collection.find({name:restname},{_id:0,"dishes.name":1,"dishes.price":1,"dishes.available":1}).then((restObj)=>{
            if(restObj){
                return restObj
            }
        }).catch((err)=>{
            next(err);
        })
    })
}

/* addRestaurant (Restaurant Object) adds the Document of the Restaurant into the Restaurant Collection */

restModel.addRestaurant = (restObj) =>{
    return connection.rConnection.getCollection().then((collection)=>{
        return collection.create(restObj).then((data)=>{
            if(data){
                console.log(data)
                return data
            }
        })
    })
}
/*deleteRestaurant (restName) deletes the Restaurant object by matching the restaurant name with the restName and then
 proceeds to delete the whole Restaurant Document */
restModel.deleteRestaurant = (restName) =>{
    return connection.rConnection.getCollection().then((collection)=>{
        return collection.deleteOne({name:restName}).then((data)=>{
            if(data){
                return data
            }
            else{
                console.log('error deleting restaurant, Please try again later')
            }
        }).catch((err)=>{
            throw err;
        })
    })
}
/*updateRestaurant (restname,restaurant object) is a method that matches the restaurant name with the restname and then
updates the document with the restaurant object */
restModel.updateRestaurant = (restName,restObj) =>{
    return connection.rConnection.getCollection().then((collection)=>{
        return collection.update({name:restName},{$set:{name:restObj.name,open:restObj.open,location:restObj.location,dishes:restObj.dishes}},{upsert:true})
    }).then((data)=>{
        if(data){
            return data
        }
        else{
            console.log('error updating data')
        }
    }).catch((err)=>{
        throw err;
    })
}
/*Exports the restauramt Model the Object to be used by the Services layer and routing layer */

module.exports = restModel;

