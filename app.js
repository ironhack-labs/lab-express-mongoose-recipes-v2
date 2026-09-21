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
  .then(function (connection) {
    console.log(`Connected to Mongo! Database name: "${connection.connections[0].name}"`);
  })
  .catch(function (error) {
    console.error("Error connecting to mongo", error);
  });


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async function (request, response) {
  try {
    const createdRecipe = await Recipe.create(request.body);
    response.status(201).json(createdRecipe);
  } catch (error) {
    response.status(500).json({ message: "Error while creating a new recipe" });
  }
});


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async function (request, response) {
  try {
    const allRecipes = await Recipe.find();
    response.status(200).json(allRecipes);
  } catch (error) {
    response.status(500).json({ message: "Error while getting all the recipes" });
  }
});


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async function (request, response) {
  try {
    const foundRecipe = await Recipe.findById(request.params.id);
    response.status(200).json(foundRecipe);
  } catch (error) {
    response.status(500).json({ message: "Error while getting a single recipe" });
  }
});


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async function (request, response) {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(request.params.id, request.body, { new: true });
    response.status(200).json(updatedRecipe);
  } catch (error) {
    response.status(500).json({ message: "Error while updating a single recipe" });
  }
});


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async function (request, response) {
  try {
    await Recipe.findByIdAndDelete(request.params.id);
    response.status(204).send();
  } catch (error) {
    response.status(500).json({ message: "Error while deleting a single recipe" });
  }
});



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
