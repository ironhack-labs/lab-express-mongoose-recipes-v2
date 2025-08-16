const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const Recipe = require("./models/Recipe.model");

const app = express();

// MIDDLEWARE
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Recipe API!");
});

// Get All Recipes
app.get("/api/recipes", (req, res) => {
  Recipe.find()
    .then((allRecipes) => {
      res.status(200).json(allRecipes);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error while getting all recipes" });
    });
});

// Create a Recipe
app.post("/api/recipes", (req, res) => {
  console.log(req.body);
  const newRecipe = new Recipe({ ...req.body });
  console.log(newRecipe);
  newRecipe
    .save()
    .then((createdRecipe) => {
      res.status(201).json(createdRecipe);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error while creating a new recipe" });
    });
});

// Get a Single Recipe
app.get("/api/recipes/:id", (req, res) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error while getting a single recipe" });
    });
});

// Update a Single Recipe
app.put("/api/recipes/:id", (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedRecipe) => {
      res.status(200).json(updatedRecipe);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error while updating a single recipe" });
    });
});

// Delete a Single Recipe
app.delete("/api/recipes/:id", (req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      res.status(500).json({ message: "Error while deleting a single recipe" });
    });
});

// Start the server

app.listen(3000, () => console.log("Server is listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
