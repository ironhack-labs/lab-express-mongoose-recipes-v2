const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

// Connect to the database
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB for seeding!");

    // Define a new recipe
    const newRecipe = {
      title: "Spaghetti Carbonara",
      instructions:
        "Boil pasta. Cook pancetta, then mix with eggs, cheese, and pasta.",
      level: "Amateur Chef",
      ingredients: ["Spaghetti", "Eggs", "Cheese", "Pancetta"],
      duration: 30,
    };

    // Insert the new recipe
    return Recipe.create(newRecipe);
  })
  .then((recipe) => {
    console.log("Recipe created:", recipe);
    return mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error creating recipe:", err);
  });
