const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = "mongodb://localhost:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to MongoDB: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// Iteration 2 - Create a Mongoose Model
const Recipe = require("./models/Recipe.model");

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res) => {
  try {
    const { title, level, ingredients, image, duration, isArchived, created } =
      req.body;
    const newRecipe = await Recipe.create({
      title,
      level,
      ingredients,
      image,
      duration,
      isArchived,
      created,
    });
    res.status(201).json({
      message: "New recipe created successfully!",
      data: newRecipe,
    });
  } catch (error) {
    console.error("POST /recipes error:", error);
    res.status(500).json({
      message: "Internal Server Error. Could not create recipe.",
      error: error.message,
    });
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json({
      message: "Recipes retrieved successfully!",
      data: recipes,
    });
  } catch (error) {
    console.error("GET /recipes error:", error);
    res.status(500).json({
      message: "Internal Server Error. Could not retrieve recipes.",
      error: error.message,
    });
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
        error: "No recipe with the given ID exists",
      });
    }
    res.status(200).json({
      message: "Recipe retrieved successfully!",
      data: recipe,
    });
  } catch (error) {
    console.error("GET /recipes/:id error:", error);
    res.status(500).json({
      message: "Internal Server Error. Could not retrieve recipe.",
      error: error.message,
    });
  }
});
//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedRecipe) {
      return res.status(404).json({
        message: "Recipe not found",
        error: "No recipe with the given ID exists",
      });
    }
    res.status(200).json({
      message: "Recipe updated successfully!",
      data: updatedRecipe,
    });
  } catch (error) {
    console.error("PUT /recipes/:id error:", error);
    res.status(500).json({
      message: "Internal Server Error. Could not update recipe.",
      error: error.message,
    });
  }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (!deletedRecipe) {
      return res.status(404).json({
        message: "Recipe not found",
        error: "No recipe with the given ID exists",
      });
    }
    res.status(200).json({
      message: "Recipe deleted successfully!",
      data: deletedRecipe,
    });
  } catch (error) {
    console.error("DELETE /recipes/:id error:", error);
    res.status(500).json({
        message: "Internal Server Error. Could not delete recipe.",
        error: error.message,
        });
    }
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
