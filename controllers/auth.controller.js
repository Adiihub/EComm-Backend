/**
 * I need to Write the controlller  / logic to register the user
 */
const bcrypt = require('bcryptjs')
const user_model = require('../models/user.model')
const jwt = require('jsonwebtoken')
const secret = require("../configs/auth.config")
exports.signup = async (req, res) => {
    /**
    * Logic to create the user
    */
    //1. Read the request Body
    const request_body = req.body //gives the req body in js object form

    //2. Insert the data in the user's collection
    const userObj = {
        name: request_body.name,
        userId: request_body.userId,
        email: request_body.email,
        userType: request_body.userType,
        password: bcrypt.hashSync(request_body.password, 8)
    }

    try{
        const user_created = await user_model.create(userObj);
        /**
         * Return this user
         */
        const res_obj = {
            name : user_created.name,
            userId : user_created.userId,
            email : user_created.email,
            userType : user_created.userType,
            createdAt : user_created.createdAt,
            updatedAt : user_created.updatedAt
        }
        res.status(201).send(res_obj);
        // 201 -- something has successfully created

    }catch(err){
        console.log("Error while registering the user", err);
         //internal server error
        res.status(500).send({
            message : "Some error happened while registering the user"
        })
    }

    //3. Return the response back to the user

}


exports.signin = async (req, res) => {

    // check if the userId is present in the system
    // const userId = req.body.userId;
    const user = await user_model.findOne({userId : req.body.userId})
    if(!user){
        return res.status(400).send({
            message : "User id passed is not a Valid UserId"
        })
    }

    // If Password is correct  // bcrypt.compareSync(req.body.password, user.password);
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if(!isValidPassword){
        return res.status(400).send({
            message : "Wrong Password passed !"
        })
    }

    // Using JWT we will created the access token with a given TTL(time To Live) and return that
    const token = jwt.sign({id : user.userId}, secret.secret, {
        expiresIn : "1h"
    })

    res.status(200).send({
        name : user.name,
        userId : user.userId,
        email : user.email,
        userType : user.userType,
        accesstoken : token
    })
}