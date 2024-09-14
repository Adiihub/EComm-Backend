/**
 * Post localhost:8888/ecomm/api/v1/auth/signup
 * 
 * I need to intercept this
 * 
 */
const authController = require('../controllers/auth.controller')


//using app obj to define the route
module.exports = (app) => {
    app.post("/ecomm/api/v1/auth/signup",authController.signup)
}