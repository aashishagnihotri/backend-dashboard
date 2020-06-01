class Dishes {
    constructor(dishObj){
        this.dishId = dishObj.dishId
        this.name = dishObj.name;
        this.available = dishObj.available;
        this.rating = dishObj.rating;
        this.price = dishObj.price
    }
}

module.exports = Dishes;