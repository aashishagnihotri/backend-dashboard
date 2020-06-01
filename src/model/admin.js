const collection = require('../utilities/connection');//Import the Connection to the Collection

/*Creates a Model Object whose method contains various Methods to perform CRUD Operations to the Database*/

let adminModel = {};

/*The getAdmin() method is a Get Method that looks for an Admin 
Object having the EMail Id of a Registered Admin  */
adminModel.getFeedback = () =>{
    return collection.feedbackConnection.getCollection().then((collection)=>{
        return collection.find().then((data)=>{
            if(data){
                return data
            }
        }).catch((err)=>{
            throw err;
        })
    })
}

adminModel.findFeedback = (email) =>{
    return collection.feedbackConnection.getCollection().then((collection)=>{
        return collection.find({email:email}).then((data)=>{
            if(data){
                return data
            }
        }).catch((err)=>{
            throw err;
        })
    })
}


adminModel.getAdmin = (adminObj) =>{
    return collection.adminConnection.getCollection().then((collection)=>{
        let username = adminObj.email;
        return collection.findOne({email:username}).then((data)=>{{
            if(data){
                return data
            }
            else{
                return ('No Users Found')
            }
        }}).catch((err)=>{
            next(err)
        })
    })
}

/*the validateLogin(username) method fetches the Admin Object from the Admin Collection
and then sends it to the Service for Validation Purposes  */

adminModel.validateLogin = (username) =>{
    return collection.adminConnection.getCollection().then((collection)=>{
        return collection.findOne({email:username}).then((data)=>{
            return data
        }).catch((err)=>{
            throw err;
        })
    })
}

/* The updateAdmin(Admin Object) is a Patch Method in Order to enable the Admin to update 
their Details in the dashboard*/

adminModel.updateAdmin = (adminObj) =>{
    return collection.adminConnection.getCollection().then((collection)=>{
        let username = adminObj.email;
        return collection.updateOne({email:username},{$set:{name:adminObj.name,password:adminObj.password}}).then((response)=>{
            if(response.nModified>0){
                return response
            }
            
        }).catch((err)=>{
            next(err);
        })
    })
}

/* The add(Admin Object) method is a Post Method that helps the Admin to Add another Admin for the dashboard
by passing in all the Required details */

adminModel.add = (adminObj) =>{
    return collection.adminConnection.getCollection().then((collection)=>{
        return collection.create(adminObj).then((data)=>{
            if(data){
                //console.log("Returning Data from Admin")
                return  data

            }
            else{
                //console.log("no data being added")
                return false
            }
        }
        )
    })
}

/*The deleteUser(Admin Object) is a Delete Method that enables the Admin to delete 
Other Admin's account from the dashboard. This also can be helpful for 
the Super Admin to Suspend any Admin account */


adminModel.delete = (adminObj)=>{
    return collection.adminConnection.getCollection().then((collection)=>{
        let username = adminObj.email;
        return collection.deleteOne({email:username}).then((data)=>{
            return data
        })
    }).catch((err)=>{
        console.log(err)
    })
}

/*Exports the Object to be used by the Services and Routing to Access the CRUD Operations */


module.exports = adminModel;