/**
 * Name,
 * Description  
 */
const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }

}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('Category', categorySchema); 
//name of the collection will created as categories instead of category (always plural)