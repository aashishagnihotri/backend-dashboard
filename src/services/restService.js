const dbLayer = require('../model/restaurant');

let service = {}

service.getDish = (dishname) =>{
    return dbLayer.getDish(dishname).then((data)=>{
        if(data){
            console.log(data)
            if(data[0] == null){
               return ({message:"No dish is available with this name"}) 
            }
            else{
                let searchResult = data[0].dishes;
                for(let i=0;i<searchResult.length;i++){
                    if(searchResult[i].name === dishname){
                        
                        
                        
                        
                        return searchResult[i];
                    }
                }

            }

        }
        else{
            console.log('no data returning to services')
        }
        
    }).catch((err)=>{
        throw err;
    })
}

service.getMultipleDish = (dishes) =>{
    for(let i=0;i<dishes.length;i++){
        let reqDish = dishes[i]
        let ReqArr = new Array();
        
        return dbLayer.getMultipleDish(dishes[i]).then((dishData)=>{
            if(dishData){
                for(let j=0;j<dishData.length;j++){
                    if(dishData[j].dishes[j].name==reqDish){
                        ReqArr.push(dishData[j].dishes[j])}
                        console.log('Array',ReqArr);
                }
            
            }
            console.log()
            return ReqArr
        
        }).then((data)=>{
            console.log(data)
            return data;
        })
        
    }
}


service.getRestDish = (dishname,restname) =>{
    return dbLayer.getRestDish(dishname,restname).then((data)=>{
        console.log(data.length)
        let finalArr = [];
        for(let i=0;i<data.length;i++){
            //console.log(i);
            //console.log(data[i].dishes);
            for(let j=0;j<data[i].dishes.length;j++){
                if (data[i].dishes[j].name === dishname){
                    finalArr.push(data[i].dishes[j]);
                }
                
            }
        
        }
        //finalArr.sort()

        return finalArr;
    
        
    
        
    }).catch((err)=>{
        throw(err);
    })
}

service.getSpecificDish = (dishname) =>{
    return dbLayer.getSpecificDish(dishname).then((data)=>{
        console.log(data.length)
        let finalArr = [];
        for(let i=0;i<data.length;i++){
            //console.log(i);
            //console.log(data[i].dishes);
            for(let j=0;j<data[i].dishes.length;j++){
                if (data[i].dishes[j].name === dishname){
                    finalArr.push(data[i].dishes[j]);
                }

            }
        
        }
        // finalArr.sort()
        // console.log(finalArr);
        // if( 1=="1"){
            //     finalArr.reverse();
        //     console.log(finalArr);
        // }
        
        return finalArr;
        
        
        
        
    }).catch((err)=>{
        throw(err);
    })
}


service.getDishByRestaurant = (restname) =>{
    return dbLayer.getDishByRestaurant(restname).then((data)=>{
        if(data){
            return data[0].dishes
            // let sResult = data[0].dishes;
            //return sResult
        }
        else{
            console.log("no Data returning from this search")
        }
    }).catch((err)=>{
        throw err;
    })
}

module.exports = service;
































//for(let i=0;i<dishes.length;i++){
    //console.log(dishes[i]);
    // return dbLayer.getMultipleDish(dishes).then((data)=>{
    //     if(data){
    //         return data
    //     }
    // }).catch((err)=>{
    //     next(err);
    // })
    
    //}

    //return resultDish;



//     //console.log("single dish returned to service");
//     for(let j=0;j<data.length;j++){

    //         console.log('data[j] is',data[j])
//         let requiredArr = data[j].dishes;
//         console.log('requiredArr is',requiredArr)
//         for(let item=0;item<requiredArr.length;item++){
//             if(requiredArr[item].name==dishes[i]){
//                 resultDish.push(requiredArr[item])
//             }
//         }
//         //resultDish.push(data);
//     }
//     console.log(resultDish)
//     return resultDish;
// }
// else{
//     return ('Some Error Occured')
// }