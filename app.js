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
const MONGODB_URI = "mongodb://localhost:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res) => {
  const {
    title,
    level,
    instructions,
    ingredients,
    cuisine,
    dishType,
    duration,
    creator,
  } = req.body;

  try {
    await Recipe.create({
      title,
      level,
      ingredients,
      instructions,
      cuisine,
      dishType,
      duration,
      creator,
    });
    res.status(201).json({ message: "Recipe created" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res) => {
  try {
    await Recipe.find().then((allRecipes) => {
      res.status(200).json(allRecipes);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Recipe.findById(id).then((recipe) => {
      res.status(200).json(recipe);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, level, ingredients, cuisine, dishType, duration, creator } =
    req.body;

  try {
    await Recipe.findByIdAndUpdate(id, {
      title,
      level,
      ingredients,
      cuisine,
      dishType,
      duration,
      creator,
    }).then(() => {
      res.status(200).json({ message: "Recipe updated" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Recipe.findByIdAndDelete(id).then(() => {
      res.status(204).json({ message: "Recipe deleted" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
