/* This is a Template for the User Object in order for Easy Data Sending Throught the layers */

class User{
    constructor(userObj){
        this.name = userObj.name;
        this.email = userObj.email;
        this.password = userObj.password;
    }
}

module.exports = User;