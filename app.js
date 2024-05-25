const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
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
  Recipe.create({
    title: req.body.title,
    instructions: req.body.instructions,
    level: req.body.level,
    ingredients: req.body.ingredients,
    image: req.body.image,
    duration: req.body.duration,
    isArchived: req.body.isArchived,
    created: req.body.created,
  })
    .then(() => {
      console.log("created recipe");
      res.status(201).json("receta creada");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json("error");
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipe", async (req, res) => {
  try {
    const response = await Recipe.find();
    res.status(200).json("todas las receteas");
  } catch (error) {
    res.status(500).json("error");
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("recipes/:id", async (req, res) => {
  try {
    await Recipe.findById(req.params.recipeId, {
      title: req.body.title,
      instructions: req.body.instructions,
      level: req.body.level,
      ingredients: req.body.ingredients,
      image: req.body.image,
      duration: req.body.duration,
      isArchived: req.body.isArchived,
      created: req.body.created,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json("error");
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("recipes/:id", async (req, res) => {
  try {
    await Recipe.findByIdAndUpdate(req.params.recipeId);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json("error");
  }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.recipeId);
    res.json("receta borrada");
  } catch (error) {
    console.log(error);
  }
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
