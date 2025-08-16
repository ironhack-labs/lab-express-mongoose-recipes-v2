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
app.post("/recipes", (req, res, next) => {
  const newRecipe = req.body;

  Recipe.create(newRecipe)
    .then((createdRecipe) => {
      res.status(201).json(createdRecipe);
    })
    .catch((error) => {
      console.log("Oh no, there's an error creating a new recipe.");
      console.log(error);
      res.status(500).json("Failed to create a new recipe");
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res, next) => {
  Recipe.find()
    .then((allRecipes) => {
      res.status(200).json(allRecipes);
    })
    .catch((error) => {
      console.log("Oh no, there's an error to get the recipes.");
      console.log(error);
      res.status(500).json("Failed to retrieve all recipes");
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res, next) => {
  const { id } = req.params;

  Recipe.findById(id)
    .then((recipeObj) => res.status(200).json(recipeObj))
    .catch((error) => {
      console.log("Failed to retrive recipe");
      console.log(error);
      res.status(500).json("Failed to retrieve the recipe");
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:d", (req, res, next) => {

    const { id } = req.params;
    const newDetails = req.body;

    Recipe.findByIdAndUpdate(id, newDetails, {new: true})
    .then(recipeObj => {
        res.status(200).json(recipeObj)
    })
    .catch((error) => {
        console.log("Failed to update recipe");
        console.log(error);
        res.status(500).json("Failed to update the recipe");
      });
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:d", (req, res, next) => {

    const { id } = req.params;

    Recipe.findByIdAndDelete(id)
    .then((recipeObj) => {
        res.status(204).json(recipeObj)
    })
    .catch((error) => {
        console.log("Failed to delete recipe");
        console.log(error);
        res.status(500).json("Failed to delete the recipe");
      });
})

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
