// Your code here ...
const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "This field is required"],
    unique: true
  },
  instructions: {
    type: String,
    required: [true, "This field is required"],
  },
  level: {
    type: String,
    required: [true, "This field is required"],
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredientes: {
    type: [String],
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: {
    type: Number,
    min: [0, "The minimum value is 0"]
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

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;