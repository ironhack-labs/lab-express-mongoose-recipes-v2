// Your code here ...
// models/Recipe.model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE A SCHEMA
const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  instructions: { type: String, required: true },
  level: { type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"] },
  ingredients: { type: [String] },
  image: { type: String, default: "https://images.media-allrecipes.com/images/75131.jpg" },
  duration: { type: Number, min: 0 },
  isArchived: { type: Boolean, default: false },
  created: { type: Date, default: Date.now }
});

// CREATE A MODEL
const Recipe = mongoose.model("Recipe", recipeSchema);

// EXPORT THE MODEL
module.exports = Recipe;
