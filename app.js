const express = require("express")
const logger = require("morgan")
const Recipe = require("./models/Recipe.model")
const PORT = 5005

const app = express()

// MIDDLEWARE
app.use(logger("dev"))
app.use(express.static("public"))
app.use(express.json())

// DATABASE CONNECTION
require("./db/database.connection")

// ROUTES

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/api/recipes', (req, res) => {

    const { title, instructions, level, ingredients, image, duration, isArchived } = req.body

    Recipe
        .create({ title, instructions, level, ingredients, image, duration, isArchived })
        .then(newRecipe => res.sendStatus(201))
        .catch(err => res.json({ code: 500, errorDetails: err }))
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/api/recipes', (req, res) => {

    Recipe
        .find()
        .then(allRecipes => res.json(allRecipes))
        .catch(err => res.json({ code: 500, errorDetails: err }))
})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/api/recipes/:recipeId', (req, res) => {

    const { recipeId } = req.params

    Recipe
        .findById(recipeId)
        .then(oneRecipes => res.json(oneRecipes))
        .catch(err => res.json({ code: 500, errorDetails: err }))
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/api/recipes/:recipeId', (req, res) => {

    const { recipeId } = req.params
    const { title, instructions, level, ingredients, image, duration, isArchived } = req.body

    Recipe
        .findByIdAndUpdate(recipeId, { title, instructions, level, ingredients, image, duration, isArchived })
        .then(editedRecipe => res.sendStatus(204))
        .catch(err => res.json({ code: 500, errorDetails: err }))
})


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/api/recipes/:recipeId', (req, res) => {

    const { recipeId } = req.params

    Recipe
        .findByIdAndDelete(recipeId)
        .then(() => res.sendStatus(204))
        .catch(err => res.json({ code: 500, errorDetails: err }))
})


// Start the server
app.listen(PORT, () => console.log(`My first app listening on port ${PORT}!`))



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app
