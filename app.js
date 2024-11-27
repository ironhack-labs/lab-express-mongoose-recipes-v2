const express = require("express");
const logger = require("morgan");
const Recipe = require("./models/Recipe.model")
require('./db')

const app = express();


// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/api/recipes', (req, res) => {
    Recipe
        .create(req.body)
        .then(createdRecipe => res.json(createdRecipe))
        .catch(err => console.log('Esto es un error', err))
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/api/recipes', (req, res) => {

    Recipe
        .find()
        .then(allRecipes => res.json(allRecipes))
        .catch(err => console.log('Ups', err))
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get('/api/recipes/:recipeId', (req, res) => {

    const { recipeId } = req.params

    Student
        .findById(recipeId)
        .then(recipeById => res.json(recipeById))
        .catch(err => console.log('Upsi', err))
})


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put('/api/recipes/:recipeId', (req, res) => {

    const { recipeId } = req.params

    Recipe
        .findByIdAndUpdate(
            recipeId,
            req.body,
            { new: true }
        )
        .then(newRecipeDetails => res.json(newRecipeDetails))
        .catch(err => console.log('Upsi', err))
})


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/api/recipes/:recipeId', (req, res) => {

    const { recipeId } = req.params

    Recipe
        .findByIdAndDelete(recipeId)
        .then(recipeDeleted => res.json(recipeDeleted))
        .catch(err => console.log('Upsi', err))
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
