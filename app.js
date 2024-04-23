const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    // Start the server
    app.listen(3000, () =>
      console.log("My first app listening on port http://localhost:3000")
    );
  })
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res) => {
  const recipe = {
    title: "Recipe 1",
    instructions: "Step 1, Step 2, Step 3",
    ingredients: "Ingredient 1",
    description: "Description 1",
    category: "Category 1",
  };
  try {
    // Create a new recipe with the request body data
    const newRecipe = await Recipe.create(recipe);

    // Respond with success status code and the newly created recipe
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating recipe" });
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res) => {
  try {
    // Find all recipes
    const recipes = await Recipe.find();

    // Respond with success status code and the recipes
    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Error getting recipes" });
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:recipeId", async (req, res) => {
  console.log(mongoose.isValidObjectId(req.params.recipeId));
  if (mongoose.isValidObjectId(req.params.recipeId)) {
    try {
      const recipe = await Recipe.findById(req.params.recipeId);
      res.status(200).json(recipe);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting recipe" });
    }
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:recipeId", async (req, res) => {
  console.log(mongoose.isValidObjectId(req.params.recipeId));
  if (mongoose.isValidObjectId(req.params.recipeId)) {
    try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        req.params.recipeId,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedRecipe);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating recipe" });
    }
  }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:recipeId", async (req, res) => {
  console.log(mongoose.isValidObjectId(req.params.recipeId));
  if (mongoose.isValidObjectId(req.params.recipeId)) {
    try {
      const deletedRecipe = await Recipe.findByIdAndDelete(req.params.recipeId);
      res.status(200).json(deletedRecipe);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting recipe" });
    }
  }
});

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
