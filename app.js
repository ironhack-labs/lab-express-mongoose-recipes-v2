const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ...

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
    .then((recipeFromDB) => {
      res.status(201).json(recipeFromDB);
    })
    .catch((error) => {
      console.log("error creating the recipe in the DB...", error);
      res.status(500).json({ error: "Failed to create a new recipe" });
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
  Recipe.find({})
    .then((allRecipes) => {
      res.status(200).json(allRecipes);
    })
    .catch(() => {
      console.log("There was an error getting all recipes", error);
      res.status(500).json({ error: "Failed to get recipes" });
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:recipeId", (req, res) => {
  const { recipeId } = req.params;
  Recipe.findById(recipeId)
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch((error) => {
      console.log("There was an error getting this specific recipe", error);
      res.status(500).json({ message: "Failed to get specific recipe" });
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:recipeId", (req, res) => {
  const { recipeId } = req.params;
  const newDetails = req.body;

  Recipe.findByIdAndUpdate(recipeId, newDetails, { new: true })
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch((error) => {
      console.log("There was an error updating the recipe", error);
      res.status(500).json({ message: "Failed to update specific recipe" });
    });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:recipeId", (req, res) => {
  const { recipeId } = req.params;
  Recipe.findByIdAndDelete(recipeId)
    .then(response => {
            res.json(response)
        })
     .catch((error) => {
      console.log("There was an error deleting the recipe", error);
      res.status(500).json({ message: "Failed to delete specific recipe" });
    })
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
