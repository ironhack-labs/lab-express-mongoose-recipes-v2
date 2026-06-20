const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

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
  .then((res) => console.log("Connected to db: " + res.connections[0].name))
  .catch((err) => console.log("Connection error: " + err));

// Import MODEL
const Recipe = require("./models/Recipe.model");

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res, next) => {
  const {
    title,
    instructions,
    level,
    ingredients,
    image,
    duration,
    isArchived,
  } = req.body;

  if (!title || !instructions) {
    res.status(400).json({ msg: "Title and instructions are required!" });
    return;
  }

  try {
    const newRecipe = {
      title,
      instructions,
      level: level,
      ingredients,
      image,
      duration: duration,
      isArchived,
    };
    const response = await Recipe.create(newRecipe);
    res.status(201).json({ msg: "recipe created!" });
  } catch (error) {
    next(error);
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res, next) => {
  try {
    const response = await Recipe.find({});
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:recipeId", async (req, res, next) => {
  try {
    const response = await Recipe.findById(req.params.recipeId);
    if (!response) {
      res.status(400).json({ msg: "Recipe not found." });
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:recipeId", async (req, res, next) => {
  const {
    title,
    instructions,
    level,
    ingredients,
    image,
    duration,
    isArchived,
  } = req.body;

  if (!title || !instructions) {
    res.status(400).json({ msg: "Title and instructions are required." });
  }

  try {
    const updatedRecipe = {
      title,
      instructions,
      level,
      ingredients,
      image,
      duration,
      isArchived,
    };

    if (Object.values(updatedRecipe).includes(undefined)) {
      res.status(400).json({ msg: "Need to sent the entire form." });
    }

    const response = await Recipe.findByIdAndUpdate(
      req.params.recipeId,
      updatedRecipe,
      {
        returnDocument: true,
        runValidators: true,
      },
    );

    if (!response) {
      res.status(400).json({ msg: "Recipe not found." });
      return;
    }

    res.status(200).json({ msg: "recipe updated!" });
  } catch (error) {
    next(error);
  }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:recipeId", async (req, res, next) => {
  try {
    const response = await Recipe.findByIdAndDelete(req.params.recipeId);
    if (!response) {
      res.status(400).json({ msg: "Sorry, recipe not found." });
      return;
    }
    res.status(200).json({ msg: "recipe deleted!" });
  } catch (error) {
    next(error);
  }
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
