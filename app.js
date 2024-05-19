const express = require("express");
const logger = require("morgan");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");
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
// app.post("/recipes", (req, res) => {
//   Recipe.create({
//     title: req.body.title,
//     instructions: req.body.title,
//     level: req.body.level,
//     ingredients: req.body.ingredients,
//     image: req.body.image,
//     duration: req.body.duration,
//     isArchived: req.body.isArchived,
//     created: req.body.created,
//   })
//     .then((createdRecipe) => {
//       res.status(201).json(createdRecipe);
//     })
//     .catch((err) => {
//       res.status(500).json({ message: "Error when creting a new recipe" });
//     });
// });

app.post("/recipes", async (req, res) => {
  try {
    const createdRecipe = await Recipe.create({
      title: req.body.title,
      instructions: req.body.instructions,
      level: req.body.level,
      ingredients: req.body.ingredients,
      image: req.body.image,
      duration: req.body.duration,
      isArchived: req.body.isArchived,
      created: req.body.created,
    });
    res.status(201).json(createdRecipe);
  } catch (err) {
    res.status(500).json({ message: "Error when creting a new recipe" });
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res) => {
  try {
    const allRecipes = await Recipe.find({});
    res.status(200).json(allRecipes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recipes" });
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (req, res) => {
  try {
    const specifiedRecipe = await Recipe.findById(req.params.id);
    if (!specifiedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(specifiedRecipe);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recipe" });
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req, res) => {
  try {
    const specifiedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!specifiedRecipe) {
      return res.status(404).json({ message: "Recipe not updated" });
    }
    res.status(200).json(specifiedRecipe);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recipe" });
  }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
