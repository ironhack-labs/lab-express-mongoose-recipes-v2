const express = require("express");
const logger = require("morgan");

const app = express();
const mongoose = require("mongoose");
const Recipe = require('./models/Recipe.model')
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
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', (req, res) => {
  Recipe.create(req.body)
    .then((recipes) => {
      res.status(201).json(recipes)
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error creating recipe' })
    })
})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', (req, res) => {
  Recipe.find({})
    .then((recipes) => {
      res.status(200).json(recipes)
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error get recipe' })
    })
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', (req, res) => {
  const recipeId = req.params.id
  Recipe.findById(recipeId)
    .then((recipes) => {
      res.status(200).json(recipes)
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error get recipe by id' })
    })
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', (req, res) => {
  const recipeId = req.params.id
  Recipe.findByIdAndUpdate(recipeId, req.body, { new: true })
    .then((recipes) => {
      res.status(200).json(recipes)
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error update recipe by id' })
    })
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:id', (req, res) => {
  const recipeId = req.params.id
  Recipe.findByIdAndDelete(recipeId)
    .then(() => {
      res.status(204).send()
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error delete recipe by id' })
    })
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
