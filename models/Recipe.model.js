// Your code here ...
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {type:String, required: true, uniquie:true},
    instructions: {type:String, required:true},
    level: {type:String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef" ]},
    ingredients: { type: [String] },
    image: { type: String, default: "https://images.media-allrecipes.com/images/75131.jpg" },
    duration: { type: Number, min: 0 },
    isArchived: { type: Boolean, default: false },
    created: { type: Date, default: Date.now }
});

// CREATE A MODEL
const Recipe = mongoose.model("recipes", recipeSchema);

// EXPORT THE MODEL
module.exports = mongoose.model('Recipe', recipeSchema);