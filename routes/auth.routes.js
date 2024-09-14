/**
 * Post localhost:8888/ecomm/api/v1/auth/signup
 * 
 * I need to intercept this
 * 
 */
const authController = require('../controllers/auth.controller')

const authMW = require("../middlewares/auth.mw")


//using app obj to define the route
module.exports = (app) => {
    app.post("/ecomm/api/v1/auth/signup", [authMW.verifySignUpBody] ,authController.signup)

    /**
    * Route for 
    * Post localhost:8888/ecomm/api/v1/auth/signin
    */
    app.post("/ecomm/api/v1/auth/signin", authController.signin)

}

