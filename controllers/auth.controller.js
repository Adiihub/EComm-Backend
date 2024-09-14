/**
 * I need to Write the controlller  / logic to register the user
 */
const bcrypt = require('bcryptjs')
const user_model = require('../models/user.model')
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