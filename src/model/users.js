const initialData = require('./data.json'); //Initial data Insertion on Collection Creation
const Collection = require('../utilities/connection');  //Import the Connection to the Collection

/*Creates a Model Object whose method contains various Methods to perform CRUD Operations to the Database*/

let userModel = {}

/* The insertScript() Deletes any documents, the Database may have, which is equivalent to dropping a database
and then inserts the initialData imported as a .json file and Creates a Collection  */

userModel.addFeedback = (feedbackObj) =>{
    return Collection.feedbackConnection.getCollection().then((collection)=>{
        return collection.create(feedbackObj).then((data)=>{
            if(data){
                return data
            }else{
                return("Error:Nothing Inserted")
            }
        }).catch((err)=>{
            throw(err)
        })
    })
}

userModel.insertScript = () =>{
    return Collection.userConnection.getCollection().then((collection)=>{
        return collection.deleteMany().then((data)=>{
            return collection.insertMany(initialData).then((response)=>{
                if(response && response.length>0){
                    return response.length
                }
                else{
                    let err = new Error("Script Insertion Failed");
                    err.status = 500;
                    throw err
                }
            })
        })
    })
}

/*The getUser(username) method is a Get Method that looks for a User 
Object having the EMail Id of a Registered User  */

userModel.getUser= (username)=>{
return Collection.userConnection.getCollection().then((collection)=>{
    return collection.findOne({email:username},{_id:0,name:1,email:1})
}).then((data)=>{
    return data
})
}

/*the validateLogin(username) method fetches the User Object from the User Collection
and then sends it to the Service for Validation Purposes  */

userModel.validateLogin = (username) =>{
    return Collection.userConnection.getCollection().then((collection)=>{
        return collection.findOne({email:username},{_id:0,password:1,email:1})
    }).then((data)=>{
        return data
    })
}

/*The getAllUsers() method is a method for the Admin in order to fetch all the details of 
the User Collection */

userModel.getAllUsers = () =>{
    return Collection.userConnection.getCollection().then((collection)=>{
        return collection.find()
    }).then((data)=>{
        return data
    })
}

/*The deleteUser(username) is a Delete Method that enables the user to delete 
their account from the dashboard. This also can be helpful for the Admin to Suspend any account */

userModel.deleteUser=(username)=>{
    return Collection.userConnection.getCollection().then((collection)=>{
        return collection.deleteOne({email:username}).then((deletedData)=>{
            if(deletedData){
                return deletedData
            }
        })
    })
}

/* The addUser(User Object) method is a Post Methos that helps the User to Register for the dashboard
by passing in all the Required details */

userModel.addUser = (userObj)=>{
    Collection.userConnection.getCollection().then((data)=>{
        return data.create(userObj).then((data)=>{
            if(data){
                return true
            }
            else{
                return false
            }
        })
    })
}

/* The updateUser(User Object) is a Patch Method in Order to enable the user to update 
their Details in the dashboard*/

userModel.updateUser = (userObj) =>{
    return Collection.userConnection.getCollection().then((collection)=>{
        let emailId = userObj.email
        //console.log(userObj.email,userObj,"\nModels")
        return collection.updateOne({email:emailId},{$set:{name:userObj.name,password:userObj.password}})
        }).then((response)=>{
            if(response.nModified>0){
                //console.log("Return to Models as response")
                return response
            }
        }).catch((err)=>{
            next(err);
        })
}

/*Exports the Object to be used by the Services and Routing to Access the CRUD Operations */

module.exports = userModel;