/**
 * Create a MiddleWare which checks the request body is proper and correct
 */
const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken");
const auth_config = require('../configs/auth.config')

const verifySignUpBody = async (req, res, next) => {

    try {
        //Check for the name
        if (!req.body.name) {
            return res.status(400).send({
                message: "Failed ! Name was not provided in request body"
            });
        }

        //Check for the email
        if (!req.body.email) {
            return res.status(400).send({
                message: "Email is required"
            });
        }

        //Check for the UserId
        if (!req.body.userId) {
            return res.status(400).send({
                message: "UserId is required"
            });
        }
        //Check if the user with the same userId is already present
        const user = await user_model.findOne({ userId: req.body.user });
        if (user) {
            return res.status(400).send({
                message: "Failed ! User with same UserId is already present"
            });
        }

        next();

    } catch (err) {
        console.log("Error while validating the request object", err);
        res.status(500).send({
            message: "Error While validating the request body"
        })
    }
}

const verifySignInBody = async (req, res, next) => {
    if (!req.body.userId) {
        return res.status(400).send({
            message: "UserId is not provided"
        });
    }
    if (!req.body.password) {
        return res.status(400).send({
            message: "Password is not provided"
        });
    }
    next();
}

const verifyToken = (req, res, next) => {

    // Check if the token is present in the Header
    const token = req.headers['x-access-token']
    if (!token) {
        return res.status(403).send({
            message: "No Token Found : UnAuthorised"
        })
    }


    // If it's the valid token
    jwt.verify(token, auth_config.secret, async (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "UnAuthorised"
            })
        }
        const user = await user_model.findOne({ userId: decoded.id })
        if (!user) {
            res.status(400).send({
                message: "UnAuthorised, this user for this token doesn't exist"
            })
        }
        //Set the user info in the request Body
        req.user = user;
        next();

    })
    // Move to the next step
}

const isAdmin = (req, res, next) => {
    const user = req.user
    if(user && user.userType == "ADMIN"){
        next()
    }
    else{
        return res.status(403).send({
            message : "Only Admin are allowed to Access this endpoint"
        })
    }
}

module.exports = {
    verifySignUpBody: verifySignUpBody,
    verifySignInBody: verifySignInBody,
    verifyToken: verifyToken,
    isAdmin: isAdmin
}