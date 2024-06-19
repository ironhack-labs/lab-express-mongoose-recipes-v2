const express = require("express");
const logger = require("morgan");
const Recipe = require("./models/Recipe.model");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
require("./db");

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post("/recipes", async (req, res) => {
  try {
    const createdRecipe = await Recipe.create(
      // ?
        // title: req.body.recipe,
        // instructions: req.body.instructions,
        // level: req.body.level,
        // ingredients: req.body.ingredients,
        // image: req.body.image,
        // duration: req.body.duration,
        // isArchived: req.body.isArchived,
        // created: req.body.created,
      req.body
    );
    res.status(201).json(createdRecipe);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `There was an error while creating a recipe: ${error}`,
    });
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res) => {
  try {
    const allRecipes = await Recipe.find();
    res.status(200).json(allRecipes);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `There was an error while fetching the recipes: ${error}`,
    });
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `There was an error while getting this recipe: ${error}`,
    });
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req, res) => {
  try {
    const recipeUpdated = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(recipeUpdated);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `There was an error while updating this recipe: ${error}`,
    });
  }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: `Recipe with id ${recipe.id} was deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `There was an error while deleting this recipe: ${error}`,
    });
  }
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
