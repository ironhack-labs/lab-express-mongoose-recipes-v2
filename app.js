const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

const app = express();
const serverErrorMsg = { message: "Internal Server Error" };

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
    console.log('Connected to Mongo! Database name: "${x.connections[0].name}"')
  )
  .catch((err) => console.log("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res) => {
  try {
    const newRecipe = await Recipe.create({
      title: req.body.title,
      instructions: req.body.instructions,
      level: req.body.level,
      ingredients: req.body.ingredients,
      image: req.body.image,
      duration: req.body.duration,
      isArchived: req.body.isArchived,
      created: req.body.created,
    });
    res.status(201).json(newRecipe);
  } catch (err) {
    console.log(err.message);
    if (err.message.includes("validation")) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(500).json(serverErrorMsg);
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json(serverErrorMsg);
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:recipeId", async (req, res) => {
  const { recipeId } = req.params;
  const notFoundMsg = { message: `No such human with id: ${recipeId}` };
  if (!mongoose.isValidObjectId(recipeId)) {
    res.status(404).json(notFoundMsg);
    return;
  }
  try {
    const recipe = await Recipe.findbyId(recipeId);
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json(serverErrorMsg);
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/recipes/:recipeId", async (req, res) => {
  const { recipeId } = req.params;
  const notFoundMsg = { message: `No such human with id: ${recipeId}` };
  if (!mongoose.isValidObjectId(recipeId)) {
    res.status(404).json(notFoundMsg);
    return;
  }
  try {
    const recipe = await Recipe.findByIdAndUpdate(recipeId);
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json(serverErrorMsg);
  }
});

//  Iteration 7 - Delete a Single Recipe
app.delete("/recipes/:recipeId", async (req, res) => {
  const { recipeId } = req.params;
  const notFoundMsg = { message: `No such human with id: ${recipeId}` };
  if (!mongoose.isValidObjectId(recipeId)) {
    res.status(404).json(notFoundMsg);
    return;
  }
  try {
    const recipe = await Recipe.findByIdAndDelete(recipeId);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json(serverErrorMsg);
  }
});
//  DELETE  /recipes/:id route

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
