/**
 * THis will be the starting file of the project
 */
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const server_config = require('./configs/server.config.js')
const db_config = require('./configs/db.config')
const user_model = require('./models/user.model.js')
const bcrypt = require("bcryptjs")

app.use(express.json()); //using as middleware (to convert json data into javascript object)


/**
 * Create an admin user at the starting of the application 
 * if already not present
 */
// COnnection of Mongo Database
mongoose.connect(db_config.DB_URL)

const db = mongoose.connection;

db.on("error", () => {
    console.log("error while connecting to the mongo database");
})

db.once("open", () => {
    console.log("connected to Mongo DataBase");

    init();
})

async function init(){
    try{
        // Create admin user if not present
        let user = await user_model.findOne({userId : "admin"})
        if(user){
            console.log("Admin is Already Present", user)
            return;
        }
    }catch(err){
        console.log("Erro while reading the data", err);
    }


    try{
        user = await user_model.create({
            name : "Aditi",
            userId : "admin",
            email : "admin@gmail.com",
            userType : "ADMIN",
            // password : "admin" //Pasword should be encrypted
            password : bcrypt.hashSync("password",8) //8- is a SALT --to make the password more complicated to enhance the security of the application
        })
        console.log("Admin Created", user);

    }catch(err){
        console.log("Error while creating Admin");
        console.log(err);
    }
}

/**
 * Stich the route to the server
 * now my server know where the route is
 * route knows where controller is
 * controller know where my model is
 */ 
require('./routes/auth.routes.js')(app) //calling routes and passing app obj
require('./routes/category.routes.js')(app)

/**
 * Start the server
 */
app.listen(server_config.PORT, ()=>{  // customisable
    console.log("Server Started at port num : ", server_config.PORT);
})