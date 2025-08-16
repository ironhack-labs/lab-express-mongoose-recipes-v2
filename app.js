const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  POST  /recipes route
app.post("/recipes", (req, res) => {
  const {
    title,
    instructions,
    level,
    ingredients,
    image,
    duration,
    isArchived,
  } = req.body;

  Recipe.create({
    title,
    instructions,
    level,
    ingredients,
    image,
    duration,
    isArchived,
  })
    .then((recipe) => res.status(201).json(recipe))
    .catch((err) => res.status(400).json(err));
});

//  GET  /recipes route
app.get("/recipes", (req, res) => {
  Recipe.find()
    .then((recipes) => res.status(200).json(recipes))
    .catch((err) => res.status(500).json(err));
});

//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res) => {
  const { id } = req.params;

  Recipe.findById(id)
    .then((recipe) => {
      if (recipe) {
        res.status(200).json(recipe);
      } else {
        res.status(404).json({ message: "Recipe not found" });
      }
    })
    .catch((err) => res.status(500).json(err));
});

//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
  const { id } = req.params;
  const {
    title,
    instructions,
    level,
    ingredients,
    image,
    duration,
    isArchived,
  } = req.body;

  Recipe.findByIdAndUpdate(
    id,
    { title, instructions, level, ingredients, image, duration, isArchived },
    { new: true }
  )
    .then((updatedRecipe) => {
      if (updatedRecipe) {
        res.status(200).json(updatedRecipe);
      } else {
        res.status(404).json({ message: "Recipe not found" });
      }
    })
    .catch((err) => res.status(500).json(err));
});

//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res) => {
  const { id } = req.params;

  Recipe.findByIdAndDelete(id)
    .then((deletedRecipe) => {
      if (deletedRecipe) {
        res.status(200).json({ message: "Recipe deleted successfully" });
      } else {
        res.status(404).json({ message: "Recipe not found" });
      }
    })
    .catch((err) => res.status(500).json(err));
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
