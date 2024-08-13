const mongoose = require("mongoose")


const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        default: 'tortilla de patatas'
    },
    instructions: {
        type: String
    },
    level: {
        type: String,
        enum: ['Easy Peasy', 'Amateur Chef', ' UltraPro Chef']
    },
    ingredients: {
        type: [String]
    },
    image: {
        type: String,
        default: 'https://images.media-allrecipes.com/images/75131.jpg'
    },
    duration: {
        type: Number,
        min: 0,
        default: 0
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    }

},
    {
        timestamps: true
    }

)

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe