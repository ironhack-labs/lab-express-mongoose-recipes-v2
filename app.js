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
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`,
    ),
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
async function create(req, res) {
  try {
    const createdRecipe = await Recipe.create(req.body);
    res.status(201).json(createdRecipe);
  } catch (error) {
    res.status(500).json({ message: "Internal error" });
  }
}
app.post("/recipes", create);

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
async function list(req, res) {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Internal error" });
  }
}
app.get("/recipes", list);

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
async function detail(req, res) {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Internal error" });
  }
}
app.get("/recipes/:id", detail);

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
async function update(req, res) {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Internal error" });
  }
}
app.put("/recipes/:id", update);

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
async function remove(req, res) {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Internal error" });
  }
}
app.delete("/recipes/:id", remove);

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
