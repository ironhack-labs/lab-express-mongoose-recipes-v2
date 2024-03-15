const express = require('express');
const logger = require('morgan');

const app = express();

// MIDDLEWARE
app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model');
// app.js
//...

const MONGODB_URI = 'mongodb://127.0.0.1:27017/express-mongoose-recipes-dev';

mongoose
	.connect(MONGODB_URI)
	.then((x) =>
		console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
	)
	.catch((err) => console.error('Error connecting to mongo', err));

// ...

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
	res.send('<h1>LAB | Express Mongoose Recipes</h1>');
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', (req, res, next) => {
	Recipe.create(req.body)
		.then((createdRecipe) => {
			res.status(201).send(createdRecipe);
		})
		.catch((error) => {
			res.status(500).send({ error: 'Failed to create the recipe' });
		});
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', (req, res) => {
	Recipe.find({})
		.then((recipes) => {
			res.status(200).send(recipes);
		})
		.catch((error) => {
			res.status(500).send({ error: 'Failed to retrieve recipes' });
		});
});
//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', (req, res) => {
	const recipeId = req.params.id;

	Recipe.findById(recipeId)
		.then((recipe) => {
			res.status(200).json(recipe);
		})
		.catch((error) => {
			res.status(500).json({ message: 'Failed to retrieve recipe' });
		});
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', (req, res) => {
	const recipeId = req.params.id;
	Recipe.findByIdAndUpdate(recipeId, req.body, { new: true })
		.then((updateRecipe) => {
			res.status(200).json(updateRecipe);
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error to update recipe' });
		});
});

//  Iteration 7 - Delete a Single Recipe
app.delete('/recipes/:id', (req, res) => {
	const recipeId = req.params.id;
	Recipe.findByIdAndDelete(recipeId)
		.then((deleteRecipe) => {
			res.status(204).send();
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error to update recipe' });
		});
});

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
