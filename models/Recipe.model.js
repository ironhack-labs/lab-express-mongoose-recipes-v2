// Your code here ...
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const recipeSchema = new Schema({
  title: { type: String, unique: true, required: true },
  instructions: { type: String, required: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  },
  ingredients: {
    type: [String],
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: {
    type: Number,
    min: 0,
  },
  isArchived: { type: Boolean, default: false },
  created: { type: Date },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
