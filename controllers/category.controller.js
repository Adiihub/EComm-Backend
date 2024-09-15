
const category_model = require('../models/category.model')

/**
 * Controller for creating the category
 * 
 *  POST localhost:8888/ecomm/api/v1/category
 * {
 *     "name": "Electronics",
 *     "description": "This will have all the electronics item"
 *  }
 */

exports.createNewCategory = async (req, res) => {
    // Read the Request Body
    // Create the Category Object
    const cat_data = {
        name: req.body.name,
        description: req.body.description
    }

    try {
        // Insert into MongoDB
        const category = await category_model.create(cat_data)
        return res.status(201).send(category);
    } catch (err) {
        console.log("Error while creating the category ", err)
        res.status(500).send({
            message: "Error while creating the category"
        })
    }

    // Return the response of the creted category
}