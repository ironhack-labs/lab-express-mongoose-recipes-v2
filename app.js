const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model")

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
    .catch((err) => console.log("Error to connect mongo", err))


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', async (req, res) => {
    const newRecipe = req.body

    try{
        const recipeFromDb = await Recipe.create(newRecipe)
        res.status(201).json(recipeFromDb)
    } catch(error) {
        res.status(500).json({error: "Error creating the new recipe"})
    }
})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', (req, res) => {
    Recipe.find()
        .then((recipes) => {
            res.json(recipes)
        })
        .catch(() => {
            res.status(500).json({error: "Error getting the recipes"})
        })
})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', (req, res) => {
    const { id } = req.params

    Recipe.findById(id)
        .then((recipe) => {
            res.json(recipe)
        })
        .catch(() => {
            res.status(500).json({error: "Error getting the recipe"})
        })
})


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', (req, res) => {
    const { id } = req.params
    const newDetails = req.body

    Recipe.findByIdAndUpdate(id, newDetails, { new: true })
        .then((recipe) => {
            res.json(recipe)
        })
        .catch(() => {
            res.status(500).json({error: "Error updating the recipe"})
        })
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:id', (req, res) => {
    const { id } = req.params

    Recipe.findByIdAndDelete(id)
        .then((response) => {
            res.status(204).json(response)
        })
        .catch(() => {
            res.status(500).json({error: "Error deleting the recipe"})
        })
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
