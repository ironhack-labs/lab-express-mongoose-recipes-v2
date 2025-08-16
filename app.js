const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const Recipe = require("./models/Recipe.model"); 
console.log("Recipe model:", Recipe);

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Connect to MongoDB
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

// POST route to create a recipe
app.post("/recipes", (req, res) => {
    Recipe.create(req.body)
      .then((createdRecipe) => res.status(201).json(createdRecipe))
      .catch((err) => {
        console.error("Error creating recipe:", err); // 👀 Log the error
        res.status(500).json({ message: "Error creating recipe", error: err.message });
      });
  });

console.log(Recipe);

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
    Recipe.find()
      .then((allRecipes) => res.status(200).json(allRecipes)) // status 200 for success
      .catch((err) => {
        console.error("Error fetching recipes:", err);
        res.status(500).json({ message: "Error fetching recipes", error: err.message });
      });
  });
  

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res) => {
    Recipe.findById(req.params.id)
      .then((recipe) => res.status(200).json(recipe)) // status 200 for success
      .catch((err) => {
        console.error("Error fetching recipes:", err);
        res.status(500).json({ message: "Error fetching recipes", error: err.message });
      });
  });



//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then((updatedRecipe) => res.status(200).json(updatedRecipe)) // status 200 for success
      .catch((err) => {
        console.error("Error updating recipes:", err);
        res.status(500).json({ message: "Error fetching recipes", error: err.message });
      });
  });


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
      .then(() => res.status(200).json()) // status 200 for success
      .catch((err) => {
        console.error("deleting:", err);
        res.status(500).json({ message: "Error fetching recipes", error: err.message });
      });
  });


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
