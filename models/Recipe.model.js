// Your code here ...
const { model, Schema } = require('mongoose')

const recipeSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        instructions: {
            type: String,
            required: true
        },
        level: {
            type: String,
            required: true,
            enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
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
            min: 0
        },
        isArchived: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const Recipe = model('Recipe', recipeSchema)

module.exports = Recipe