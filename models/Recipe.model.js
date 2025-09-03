const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "Ultra Pro Chef"],
  },
  ingredients: {
    type: [String],
  },
  image: {
    type: [String],
  },
  duration: {
    type: Number,
    min: 0,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  created:{
    type:Date,
    default:Date.now()
  }
});

const Recipe = mongoose.model("Recipe",recipeSchema)

module.exports = Recipe