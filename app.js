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
const MONGODB_URL = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URL)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post("/recipes", (req, res) => {
  Recipe.create({
    title: req.body.title,
    instructions: req.body.instructions,
    level: req.body.level,
    ingredients: req.body.ingredients || [],
    image: req.body.image,
    duration: req.body.duration,
    isArchived: req.body.isArchived,
    created: req.body.created,
  })
    .then((createdRecipe) => {
      console.log("Recipe created -> ", createdRecipe);
      res.status(201).json(createdRecipe);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json("Failed to create Recipe");
    });
});

app.post("/recipes", (req, res) => {
  Recipe.find()
    .then((recipes) => res.status(200).json(recipes))
    .catch((error) => res.status(500).json(error));
});

app.post("/recipes/:recipeId", (req, res) => {
  const { recipeId } = req.params;
  Recipe.findById(recipeId)
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error w/ single recipe" });
    });
});

app.put("/recipes/:recipeId", (req, res) => {
  const { recipeId } = req.params;
  Recipe.findByIdAndUpdate(recipeId, req.body, { new: true })
    .then((updatedRecipe) => {
      res.status(200).json(updatedRecipe);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error while updating a single recipe" });
    });
});

app.delete("/recipes/:recipeId", (req, res) => {
  console.log("Delete ID:", req.params.recipeId);
  Recipe.findByIdAndDelete(req.params.recipeId)
    .then(() => res.status(204).send())
    .catch((error) => res.status(500).json(error));
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
