// Your code here ...
const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({

    title: {
        type: String,
        requiered: true,
        unique: true
    },
    instructions: {
        type: String,
        requiered: true
    },
    level: {
        type: String,
        enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
    },
    ingredients: {
        type: [String]
    },
    Image: {
        type: String,
        default: "https://images.media-allrecipes.com/images/75131.jpg"
    },
    duration: {
        type: Number,
        min: 0,
    },
    isArchived: {
        type: Boolean,
        default: false
    }


}, {
    timestamps: true
})

const Recipe = mongoose.model('recipe', recipeSchema)

module.exports = Recipe

