const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      require: "Title is required for the recipe",
      unique: true,
      minLength: [3, "Title must be at least 3 characters long"],
      maxLength: [50, "Title can't be more than 16 characters long"],
    },
    instructions: {
      type: String,
      require: "The instructions are required for the recipe",
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
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    created: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc.id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
