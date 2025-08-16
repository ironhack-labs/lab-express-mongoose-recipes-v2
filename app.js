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
app.post("/recipes", (req, res) => {
  const newRecipe = req.body;
  Recipe.create(newRecipe)
    .then((createdRecipe) => {
      console.log("Recipe added ->", createdRecipe);
      res.status(201).json(createdRecipe);
    })
    .catch((error) => {
      console.error("Error while adding recipe", error);
      res.status(500).json({ error: "Failed to post recipes" });
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
  Recipe.find({})
    .then((recipes) => {
      console.log("Retrieved recipes ->", recipes);
      res.status(200).json(recipes);
    })
    .catch((error) => {
      console.error("Error while retrieving recipes ->", error);
      res.status(500).json({ error: "Failed to retrieve recipes" });
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res) => {

    const { recipeId } = req.params;
    
    Recipe.findById(recipeId)
    .then((recipe) => {
      console.log("Retrieved recipes ->", recipe);
      res.status(200).json(recipe);
    })
    .catch((error) => {
      console.error("Error while retrieving recipes ->", error);
      res.status(500).json({ error: "Failed to retrieve recipes" });
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:recipeId", (req, res) => {
  const { recipeId } = req.params;
  const newRecipe= req.body;

  Recipe.findByIdAndUpdate(recipeId, newRecipe, { new: true })
    .then((updatedRecipe) => {
      console.log("Updated Recipe ->", updatedRecipe);
      res.status(200).json(updatedRecipe);
    })
    .catch((error) => {
      console.error("Error while updating the recipe ->", error);
      res.status(500).json({ error: "Failed to update the recipe" });
    });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
      .then((_result) => {
        console.log("Recipe deleted!");
        res.status(204).send(); // Send back only status code 204 indicating that resource is deleted
        })
      .catch((error) => {
        console.error("Error while deleting the recipe ->", error);    
          res.status(500).json({ error: "Deleting recipe failed" })
        });
  });
// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
