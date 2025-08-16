const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const recipeSchema = new Schema ({
    title: String,
    instruction: String,
    level: String,
    ingredients: [String],
    image: String,
    duration: Number,
    isArchived: Boolean,
    created: Date
})

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;