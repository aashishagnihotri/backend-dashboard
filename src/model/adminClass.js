/* This is a Template for the Admin Object in order for Easy Data Sending Throught the layers */
class Admin{
    constructor(adminObj){
        this.name = adminObj.name;
        this.email = adminObj.email;
        this.password = adminObj.password;
    }
}

module.exports = Admin;