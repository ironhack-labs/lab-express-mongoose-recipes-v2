const { mongoose, Schema } = require("mongoose");

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  instructions: {
    type: String,
    required: true,
  },
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
    min: 0, // Minimum value of 0
  },
  isArchived: {
    type: Boolean,
    default: false, // Default value of false
  },
  created: {
    type: Date,
    default: Date.now, // Default to the current date and time
  },
});
const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
