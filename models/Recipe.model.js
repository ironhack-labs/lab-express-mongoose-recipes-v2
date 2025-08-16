const { model, Schema } = require("mongoose");

const recipeSchema = new Schema(
    {
        title: {
            type: String,
            unique: true,
            required: true
        },
        instructions: {
            type: String,
            required: true
        },
        level: {
            type: String,
            enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
            required: true
        },
        ingredients: {
            type: [String]
        },
        image: {
            type: String,
            default: "https://images.media-allrecipes.com/images/75131.jpg",
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
const Recipe = model("Recipe", recipeSchema)

module.exports = Recipe