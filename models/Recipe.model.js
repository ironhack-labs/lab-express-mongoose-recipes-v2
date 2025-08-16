const { model, Schema } = require("mongoose")

const recipeSchema = new Schema(
    {
        title: {
            type: String
        },
        instructions: {
            type: String
        },
        level: {
            type: String,
            enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
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
        }
    },
    {
        timestamps: true
    })

const Recipe = model('Recipe', recipeSchema)

module.exports = Recipe