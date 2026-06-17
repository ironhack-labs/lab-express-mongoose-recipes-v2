const express = require('express')
const logger = require('morgan')

const app = express()

// MIDDLEWARE
app.use(logger('dev'))
app.use(express.static('public'))
app.use(express.json())

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require('mongoose')
const Recipe = require('./models/Recipe.model')

const mongodb_uri = 'mongodb://127.0.0.1:27017/express-mongoose-recipes-dev'

mongoose
  .connect(mongodb_uri)
  .then((x) =>
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`,
    ),
  )
  .catch((err) => console.error('Error connecting to mongo', err))

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
  res.send('<h1>LAB | Express Mongoose Recipes</h1>')
})

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', async (req, res) => {
  try {
    const response = await Recipe.create(req.body)
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', async (req, res) => {
  try {
    const response = await Recipe.find({})
    res.json(response)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:recipeId', async (req, res) => {
  console.log(req.params.recipeId)
  try {
    const response = await Recipe.findById(req.params.recipeId)
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put('/recipes/:recipeId', async (req, res) => {
  try {
    const response = await Recipe.findByIdAndUpdate(
      req.params.recipeId,
      req.body,
      { new: true },
    )
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:recipeId', async (req, res) => {
  try {
    const response = await Recipe.findByIdAndDelete(req.params.recipeId)
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'))

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app
