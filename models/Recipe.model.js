// Your code here ...
const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  instruction: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  },
  Ingredients: {
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
  isArchieved: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema)

module.exports = Recipe