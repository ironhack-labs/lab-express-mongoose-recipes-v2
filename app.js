const express = require("express")
const logger = require("morgan")
const Recipe = require("./models/Recipe.model")

const PORT = 5005
const app = express()

// MIDDLEWARE
app.use(logger("dev"))
app.use(express.static("public"))
app.use(express.json())


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
require('./db')


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>")
})


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/api/recipes', (req, res) => {

    const { title, instructions, level, ingredients, image, duration, isArchived, created } = req.body

    Recipe
        .create({ title, instructions, level, ingredients, image, duration, isArchived, created })
        .then(recipe => res.json(recipe))
        .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))

})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/api/recipes', (req, res) => {

    Recipe
        .find()
        .then(recipes => res.json(recipes))
        .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))

})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/api/recipes/:id', (req, res) => {

    const { id: recipeId } = req.params

    Recipe
        .findById(recipeId)
        .then(recipe => res.json(recipe))
        .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))

})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/api/recipes/:id', (req, res) => {

    const { title, instructions, level, ingredients, image, duration, isArchived, created } = req.body

    const { id: recipeId } = req.params

    Recipe
        .findByIdAndUpdate(recipeId, { title, instructions, level, ingredients, image, duration, isArchived, created }, { new: true })
        .then(recipe => res.json(recipe))
        .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))
})


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/api/recipes/:id', (req, res) => {

    const { id: recipeId } = req.params

    Recipe
        .findByIdAndDelete(recipeId)
        .then(recipe => res.sendStatus(204))
        .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))
})


// Start the server
app.listen(PORT, () => console.log(`App listening on port ${PORT}`))



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app
