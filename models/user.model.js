let mongoose = require('mongoose');

/**
 * name
 * userId
 * password
 * email
 * userType
 */

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    userId : {
        type : String,
        require : true,
        unique : true,
        },
    password : {
        type : String,
        require : true,
    },
    email : {
        type : String,
        require : true,
        lowercase : true, // taki sare lower case me ho
        minLength : 9,
        unique : true
    },
    userType : {
        type : String,
        require : true,
        default : "CUSTOMER",
        enum : ["CUSTOMER", "ADMIN"] //FOR 2 hi type ke user possiable hai
    }
},{timestamps : true, versionKey : false})

module.exports = mongoose.model("User", userSchema) // users krke collection bna dega