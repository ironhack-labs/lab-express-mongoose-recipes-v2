const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//SCHEME

const recipeSchema = new Schema({
    title:{
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
        enum: ["Easy Pease", "Amateur Chef", "UltraPro chef"]
    },
    ingredients: {
        type: [ String ]
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
        default: Date.now
    }

});

//MODEL

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;