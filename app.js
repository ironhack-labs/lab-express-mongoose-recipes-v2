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
const MONGODB_URI = 'mongodb://localhost:27017/express-mongoose-recipes-dev';
// mongoose.connect() retourne une Promise
mongoose
  .connect(MONGODB_URI)
  //   x = objet représentant la connexion à MongoDB
  // x.connections → liste des connexions
  // x.connections[0].name → nom de la base
  // x.connections[0].host → hôte (127.0.0.1)
  // x.connections[0].port → port (27017)
  .then((x) =>
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`,
    ),
  )
  .catch((err) => console.error('Error connecting to mongo', err));

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
  res.send('<h1>LAB | Express Mongoose Recipes</h1>');
});

//  Iteration 3 - Create a Recipe route
app.post('/recipes', (req, res) => {
  Recipe.create({
    title: req.body.title,
    instructions: req.body.instructions,
    level: req.body.level,
    ingredients: req.body.ingredients,
    image: req.body.image,
    duration: req.body.duration,
    isArchived: req.body.isArchived,
    created: req.body.created,
  })
    .then((createRecipe) => {
      res.status(201).json(createRecipe);
    })
    .catch((error) => {
      res.status(500).json('Error creating a new recipe');
    });
});

//  Iteration 4 - Get All Recipes
app.get('/recipes', (req, res) => {
  Recipe.find()
    .then((allRecipes) => {
      res.status(200).json(allRecipes);
    })
    .catch((error) => {
      res.status(500).json('Error getting the recipes');
    });
});

//  Iteration 5 - Get a Single Recipe
app.get('/recipes/:recipeId', (req, res) => {
  Recipe.findById(req.params.recipeId)
    .then((singleRecipe) => {
      res.status(200).json(singleRecipe);
    })
    .catch((error) => {
      res.status(500).json('Error getting a recipe');
    });
});

//  Iteration 6 - Update a Single Recipe
app.put('/recipes/:recipeId', (req, res) => {
  Recipe.findByIdAndUpdate(req.params.recipeId, req.body, { new: true })
    .then((updatedRecipe) => {
      res.status(200).json(updatedRecipe);
    })
    .catch((error) => {
      res.status(500).json('Error updating a recipe');
    });
});

//  Iteration 7 - Delete a Single Recipe
app.delete('/recipes/:recipeId', (req, res) => {
  Recipe.findByIdAndDelete(req.params.recipeId)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      res.status(500).json('Error deleting a recipe');
    });
});
// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
