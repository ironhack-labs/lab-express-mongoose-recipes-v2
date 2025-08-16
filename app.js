const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose")
PORT = 5005
const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

const databaseName = 'express-mongoose-recipes-dev'
const MONGODB_URI = `mongodb://127.0.0.1:27017/${databaseName}`

mongoose
    .connect(MONGODB_URI)
    .then((x) => console.log(`Conected to mongo! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.log('Err conecting mongo', err))


const Recipe = require('./models/Recipe.model')

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/api/recipes', (req, res) => {
    const { title, instructions, level, ingredients, image, duration, isArchived, created } = req.body

    Recipe
        .create({ title, instructions, level, ingredients, image, duration, isArchived, created })
        .then(createdRecipe => res.status(201).json(createdRecipe))
        .catch(err => res.status(500).json(err))
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/api/recipes', (req, res) => {
    Recipe
        .find()
        .then(allRecipes => res.json(allRecipes))
        .catch(err => res.status(500).json(err))
})



//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/api/recipes/:id', (req, res) => {
    const { id: recipeId } = req.params
    Recipe
        .findById(recipeId)
        .then(recipeInfo => res.json(recipeInfo))
        .catch(err => res.status(500).json(err))

})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/Route
app.put('/api/recipes/:id', (req, res) => {
    const { id: recipeId } = req.params
    const { title, instructions, level, ingredients, image, duration, isArchived, created } = req.body

    Recipe
        .findByIdAndUpdate(recipeId)
        .then(() => res.sendStatus(202))
        .catch(err => res.sendStatus(500).json(err))
})


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete('/api/recipes/:id', (req, res) => {
    const { id: recipeId } = req.params

    Recipe
        .findByIdAndDelete(recipeId)
        .then(() => res.sendStatus(202))
        .catch(err => res.sendStatus(500).json(err))
})

// Start the server
app.listen(PORT, () => console.log('My first app listening on port 5005!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
