const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// Import the Recipe model we created in Iteration 2
const Recipe = require("./models/Recipe.model");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


// Iteration 3 | Create a Recipe
app.post('/recipes', async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Iteration 4 | Get All Recipes
app.get('/recipes', async (req, res) => {
  try {
    const allRecipes = await Recipe.find();
    res.status(200).json(allRecipes);
  } catch (error) {
    console.error("Error getting all recipes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Iteration 5 | Get a Single Recipe
app.get('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.status(200).json(recipe);
  } catch (error) {
    console.error("Error getting the recipe:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Iteration 6 | Update a Single Recipe
app.put('/recipes/:id', async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } // Ensures we get the updated document back in the response
    );
    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error("Error updating the recipe:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Iteration 7 | Delete a Single Recipe
app.delete('/recipes/:id', async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.status(204).send(); // 204 means No Content, so we don't send a JSON body back
  } catch (error) {
    console.error("Error deleting the recipe:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));