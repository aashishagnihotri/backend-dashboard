
/*All the Necessary Imports of the Libraries and setting the required Properties*/
const mongoose = require('mongoose');
mongoose.Promise = global.Promise
const Schema = mongoose.Schema
mongoose.set('useCreateIndex',true,);
mongoose.set('useUnifiedTopology',true)

/* Defining the User Schema using the Mongoose Library*/

let userSchema = {
        
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String
    }
}
/*Creates a user Schema based on the Above Defined Schema*/
let uSchema = new Schema(userSchema , {collection :"Users" , timestamps:true});

/*Creates a User Object In which, Porperties include Connection to the User Schema*/ 

let userConnection ={}

/*The getCollection() method of the User Connection Object is used to 
connect to the Database and Bridge the Bi-Directional Data Flow */


userConnection.getCollection = () =>{
    return mongoose.connect("mongodb://localhost:27017/Food_Dashboard",{useNewUrlParser:true},).then((db)=>{
        return db.model("Users",uSchema)
    }).catch((err)=>{
        console.log(err.message);
        let error = new Error("Could not Connect to the User Database");
        error.status = 500;
        throw error;
    })
}
/**************************Admin Connection*********************************/

/*Defines the Structure of the Admin Schema as per the Requirements*/

let adminSchema = {
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String
    }
}

/*Creates the Admin Schema in accordance with the afore Mentioned Structure*/

let aSchema = new Schema(adminSchema,{collection:"Admin",timestamps:true});

/*Creates an Admin Connection Object which Facilitates the Connection to the 
Admin Collection in the Database */

let adminConnection = {};

/*The getCollection() method of the Admin Connection Object is used to 
connect to the Database and Bridge the Bi-Directional Data Flow */


adminConnection.getCollection = () =>{
    return mongoose.connect("mongodb://localhost:27017/Food_Dashboard",{useNewUrlParser:true}).then((db)=>{
        return db.model("Admin",aSchema)
    }).catch((adminErr)=>{
        throw adminErr
    })
}

/**********************************Restaurants**************************************/

/* This Creates a Schema For the Restaurants Collection in the Database as per the Requirements */
let restaurantSchema = {
    name:{
        required:true,
        unique:true,
        type:String
    },
    open:{
        required:true,
        type:Boolean
    },
    location:{
        type:String,
        required:true,
    },
    dishes:[{
        dishId:{
            required:true,
            type:Number,
            unique:true
        },
        name:{
            required:true,
            type:String
        },
        price:{
            required:true,
            type:Number
        },
        rating:{
            required:true,
            type:Number
        },
        available:{
            required:true,
            type:Boolean
        }
    
        
    }]

}

/*Creates a Schema for the Restaurant with the Afore described Schema */
let rSchema = new Schema(restaurantSchema,{collection:"Restaurants",timestamps:true});

/*Creates an Restaurant Connection Object which Facilitates the Connection to the 
Admin Collection in the Database */

let rConnection = {};

/*The getCollection() method of the Restaurant Connection Object is used to 
connect to the Database and Bridge the Bi-Directional Data Flow */


rConnection.getCollection = () =>{
    return mongoose.connect("mongodb://localhost:27017/Food_Dashboard",{useNewUrlParser:true}).then((db)=>{
        return db.model("Restaurants",rSchema)
    }).catch((err)=>{
        throw err;
    })
}


/*******************************************Cart Schema *************************************/


let cartSchema = {
    email:{
        required:true,
        type:String
    },
    orders:[{
        dishId:{
            required:true,
            type:Number
        },
        quantity:{ 
            required:true,
            type:Number
        }
    }
    ]
}

let cSchema = new Schema(cartSchema,{collection:"Cart",timestamps:true});

let cartConnection = {};

cartConnection.getCollection = () =>{
    return mongoose.connect('mongodb://localhost:27017/Food_Dashboard',{useNewUrlParser:true}).then((db)=>{
        return db.model("Cart",cSchema)
    }).catch((err)=>{
        next(err)
    })
}


/*********************************Customer Feedback Schema********************************* */

let feedbackSchema = {
    email:{
        required:true,
        type:String
    },
    feedbackType:{
        required:true,
        type:String
    },
    comment:{
        type:String,
        required:true
    }
};

let fSchema = new Schema(feedbackSchema,{collection:"Feedback",timestamps:true})

let feedbackConnection = {};

feedbackConnection.getCollection = () =>{
    return mongoose.connect('mongodb://localhost:27017/Food_Dashboard',{useNewUrlParser:true}).then((db)=>{
        return db.model("Feedback",fSchema)
    }).catch((err)=>{
        next(err)
    })
}

exports.feedbackConnection = feedbackConnection;
exports.cartConnection = cartConnection;

/*Exports the Restaurant Connection as rConnection to Facilitate the CRUD Operations using Models*/

exports.rConnection = rConnection;

/*Exports the Admin Connection as rConnection to Facilitate the CRUD Operations using Models*/

exports.adminConnection = adminConnection;

/*Exports the User Connection as rConnection to Facilitate the CRUD Operations using Models*/

exports.userConnection = userConnection;




















/************************************Dishes Schema**************************************** */

// let dishSchema = {
//     dishId:{
//         required:true,
//         type:Number,
//         unique:true
//     },
//     name:{
//         required:true,
//         type:String,
//         unique:true
//     },
//     price:{
//         required:true,
//         type:Number
//     },
//     rating:{
//         required:true,
//         type:Number
//     },
//     available:{
//         required:true,
//         type:Boolean
//     }

// }

// let dSchema = new Schema(dishSchema,{collection:"Dishes",timestamps:true});

// let dishConnection = {};

// dishConnection.getCollection=()=>{
//     return mongoose.connect("mongodb://localhost:27017/Food_Dashboard",{useNewUrlParser:true}).then((db)=>{
//         return db.model("Dishes",dSchema)
//     }).catch((dishError)=>{
//         throw dishError
//     })
// }

//exports.dishConnection = dishConnection;