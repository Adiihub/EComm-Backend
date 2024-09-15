/**
 * Create a MiddleWare which checks the request body is proper and correct
 */
const user_model = require("../models/user.model")

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

module.exports = {
    verifySignUpBody: verifySignUpBody,
    verifySignInBody: verifySignInBody
}