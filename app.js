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
    .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
// GET / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

// Iteration 3 - Create a Recipe route
// POST /recipes route
app.post('/recipes', async (req, res) => {
    try {
        const newRecipe = await Recipe.create(req.body);
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Iteration 4 - Get All Recipes
// GET /recipes route
app.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Iteration 5 - Get a Single Recipe
// GET /recipes/:id route
app.get('/recipes/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Iteration 6 - Update a Single Recipe
// PUT /recipes/:id route
app.put('/recipes/:id', async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Iteration 7 - Delete a Single Recipe
// DELETE /recipes/:id route
app.delete('/recipes/:id', async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!deletedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json({ message: 'Recipe successfully deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));

// ❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;