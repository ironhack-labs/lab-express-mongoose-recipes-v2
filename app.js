const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model');

const app = express();

// MIDDLEWARE
app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = 'mongodb://127.0.0.1:27017/express-mongoose-recipes-dev';

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.log('error: connecting to database failed');
    console.log(err);
    res.status(500).json({ error: 'error: connnecting to database failed' });
  });

mongoose.set('runValidators', true);

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
  res.send('<h1>LAB | Express Mongoose Recipes</h1>');
});

//  Iteration 3 - Create a Recipe route
app.post('/recipes', (req, res) => {
  const newRecipe = req.body;
  Recipe.create(newRecipe)
    .then((recipe) => res.status(201).json(recipe))
    .catch((err) => {
      console.log('error: failed to create recipe');
      console.log(err);
      res.status(500).json({ error: 'failed to create recipe' });
    });
});

//  Iteration 4 - Get All Recipes
app.get('/recipes', (req, res) => {
  Recipe.find()
    .then((recipes) => res.status(200).json(recipes))
    .catch((err) => {
      console.log('error: failed to get data from db');
      console.log(err);
      res.status(500).json({ error: 'failed to get data from db' });
    });
});

//  Iteration 5 - Get a Single Recipe
app.get('/recipes/:Id', (req, res) => {
  const { Id } = req.params;
  Recipe.findById(Id)
    .then((recipe) => res.status(200).json(recipe))
    .catch((err) => {
      console.log(`error: failed to get recipe with id: ${Id}`);
      console.log(err);
      res.status(500).json({ error: `failed to get recipe with id: ${Id}` });
    });
});

//  Iteration 6 - Update a Single Recipe
app.put('/recipes/:Id', (req, res) => {
  const { Id } = req.params;
  const editRecipe = req.body;
  Recipe.findByIdAndUpdate(Id, editRecipe, { new: true })
    .then((recipe) => res.status(200).json(recipe))
    .catch((err) => {
      console.log(`error: failed to update recipe with id: ${Id}`);
      console.log(err);
      res.status(500).json({ error: `failed to update recipe with id: ${Id}` });
    });
});

//  Iteration 7 - Delete a Single Recipe
app.delete('/recipes/:Id', (req, res) => {
  const { Id } = req.params;
  Recipe.findByIdAndDelete(Id)
    .then((recipe) => res.status(204).send())
    .catch((err) => {
      console.log(`error: failed to delete recipe with id: ${Id}`);
      console.log(err);
      res.status(500).json({ error: `failed to delete recipe with id: ${Id}` });
    });
});

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
