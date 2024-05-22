
const { model, Schema } = require("mongoose");

const recipeSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        level: {
            type: String,
            enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
        },
        ingredients: {
            type: [String],
        },
        image: {
            type: String,
            Default: "https://images.media-allrecipes.com/images/75131.jpg",
        },
        duration: {
            type: Number,
            min: 0,
        },
        isArchived: {
            required: true,
            type: Boolean
        },
        timestamps: {
            type: Date,
            default: Date.now,
        }
    }

)

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe