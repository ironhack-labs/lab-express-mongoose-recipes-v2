const mongoose = require('mongoose')
const currentDate = new Date().toDateString();

const recipeSchema = new mongoose.Schema({
    title: {
        type: String
    },
    instructions: {
        type: String
    },
    level: {
        type: String,
        enum: ["Easy Peasy ", "Amateur Chef", "UltraPro Chef"]
    },
    ingredients: {
        type: [String]
    },
    image: {
        type: String,
        default: "https://images.media-allrecipes.com/images/75131.jpg"
    },
    duration: {
        type: Number,
        min: 0
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: currentDate
    },
}, {
    timestamps: true
})

const Recipe = mongoose.model('recipe', recipeSchema)

module.exports = Recipe