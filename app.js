const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const Recipe = require('./models/Recipe.model');

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`,
    ),
  )
  .catch((err) => console.error('Error connecting to mongo', err));

// ...
const app = express();

// MIDDLEWARE
app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
  res.send('<h1>LAB | Express Mongoose Recipes</h1>');
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', (req, res) => {
  const {
    title,
    level,
    ingredients,
    cuisine,
    dishType,
    image,
    duration,
    creator,
    created,
  } = req.body;
  // const dataForRecipe = req.body;
  Recipe.create({
    title,
    level,
    ingredients,
    cuisine,
    dishType,
    image,
    duration,
    creator,
    created,
  })

    .then((createdRecipe) => {
      console.log('Recipe created', createdRecipe);
      res.status(201).json(createdRecipe);
    })
    .catch((error) => {
      console.error('Err while creating Recipe', error);
      res.status(500).json({ error: 'Failed to create the Recipe :(' });
    });
});

//  Iteration 4 - Get All Recipes
app.get('/recipes', (req, res) => {
  Recipe.find({})
    .then((recipes) => {
      console.log('retrieved recipes', recipes);
      res.status(200).json();
    })
    .catch((error) => {
      console.log('error retrieving recipes', error);
      res.status(500).json({ error: 'Failed to retrieve recipiessss' });
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', (req, res) => {
  const RecipeId = req.params.id;
  Recipe.findById(RecipeId)
    .then((RecipeId) => {
      console.log('retrieved recipe id', RecipeId);
      res.status(200).json(RecipeId);
    })
    .catch((error) => {
      console.log('error retrieving recipe od', error);
      res.status(500).json({ error: 'Failed to retrieve recipie id' });
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id'),
  (req, res) => {
    const {
      title,
      level,
      ingredients,
      cuisine,
      dishType,
      image,
      duration,
      creator,
      created,
    } = req.body;
    const recipeId = req.params.id;
    Recipe.findByIdAndUpdate(
      //   { _id: recipeId },
      //   {
      //     title,
      //     level,
      //     ingredients,
      //     cuisine,
      //     dishType,
      //     image,
      //     duration,
      //     creator,
      //     created,
      //   },
      req.params.id,
      req.body,
      { new: true },
    )
      .then((updatedRecipe) => {
        console.log('retrieved recipe id', updatedRecipe);
        res.status(200).json();
      })
      .catch((error) => {
        console.log('error updating recipe id', error);
        res
          .status(500)
          .json({ error: 'Failed to retrieve and update recipie id' });
      });
  };

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete('/recipes/:id', (req, res) => {
  const myIdToDel = req.params.id;

  Recipe.findByIdAndDelete(myIdToDel)
    .then((deletedRecipe) => {
      console.log('Recipe deleted:', deletedRecipe);
      res.status(204).send();
    })
    .catch((error) => {
      console.log('Error deleting recipe:', error);
      res.status(500).json({ error: 'Failed to delete recipe' });
    });
});

// Start the server
app.listen(PORT, () => console.log('My first app listening on port 3000!'));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
