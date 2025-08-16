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
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
app.post("/recipes route", async (req, res) => {
  try {
    const { title, instructions, level, ingredients, image, duration, isArchived, created } = req.body;
    const newRecipe = await Recipe.create({ title, instructions, level, ingredients, image, duration, isArchived, created });
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ message: "Error" + error });
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error" + error });
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error" + error });
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/recipes/:id", async (req, res) => {
  try {
    const recipeId = req.params.id;
    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, req.body, { new: true });
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the recipe" });
  }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res) => {
  try {
    const recipeId = req.params.id;
    await Recipe.findByIdAndDelete(recipeId);
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to update the recipe" });
  }
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
