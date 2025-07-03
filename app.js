const mongoose = require("mongoose");
const express = require("express");
const logger = require("morgan");

const Recipe = require("./models/Recipe.model");

const app = express();

app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

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
  try {
    const newRecipe = new Recipe({ ...req.body });
    newRecipe.save();
    res.status(201).json(newRecipe);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
  try {
    Recipe.find().then((recipes) => {
      res.status(200).json(recipes);
    });
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res) => {
  try {
    Recipe.findById(req.params.id).then((recipe) => {
      res.status(200).json(recipe);
    });
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
  try {
    Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
      (recipe) => {
        res.status(200).json(recipe);
      }
    );
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res) => {
  try {
    Recipe.findByIdAndDelete(req.params.id).then(() => {
      res.status(204).send();
    });
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
