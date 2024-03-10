const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require('./models/Recipe.model')

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
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
const recipeRoutes = require('./routes/recipe.routes')
app.use('/api', recipeRoutes);

// GET /recipes route
app.get('/recipes', (req, res) => {
    Recipe.find()
        .then((recipes) => {
            res.status(200).json(recipes);
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error finding recipes' });
        })
});

// GET /recipes/:id route
app.get('/recipes/:id', (req, res) => {
    Recipe.findById(req.params.id)
        .then((recipe) => {
            res.status(200).json(recipe);
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error finding the recipe' });
        })
});

// PUT /recipes/:id route
app.put('/recipes/:id', (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((updatedRecipe) => {
            res.status(200).json(updatedRecipe);
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error updating recipe' });
        })
});

// DELETE /recipes/:id route
app.delete('/recipes/:id', (req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).send();
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error deleting recipe' });
        })
});

// Start the server
app.listen(4000, () => console.log('My first app listening on port 4000!'));

// Export the app if needed
module.exports = app;
