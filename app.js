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
	.then(x =>
		console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
	)
	.catch(err => console.error('Error connecting to mongo', err));

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
	res.send('<h1>LAB | Express Mongoose Recipes</h1>');
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', async (req, res) => {
	const newRecipe = {
		title: 'Pizza',
		instructions: 'Bake it good',
		level: 'Easy Peasy',
		ingredients: ['dough', 'water', 'tomato'],
		duration: 2,
		isArchived: false,
	};

	try {
		const createdRecipe = await Recipe.create(newRecipe);
		console.log(`🚀 ~ app.post ~ createdRecipe:`, createdRecipe);
		return res.status(201).json(createdRecipe);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: 'Error while creating a new recipe', error });
	}
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', async (req, res) => {
	try {
		const foundRecipes = await Recipe.find({});
		console.log(`🚀 ~ app.get ~ foundRecipes:`, foundRecipes);
		return res.status(200).json(foundRecipes);
	} catch (error) {
		return res
			.status(500)
			.json({ message: 'Error while retrieving recipes', error });
	}
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', async (req, res) => {
	try {
		const foundRecipe = await Recipe.findOne({ _id: recipeID });
		console.log(`🚀 ~ app.get ~ foundRecipes:`, foundRecipe);
		return res.status(200).json(foundRecipe);
	} catch (error) {
		return res
			.status(500)
			.json({ message: 'Error while retrieving recipes', error });
	}
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', async (req, res) => {
	console.log(`🚀 ~ app.get ~ recipeID:`, req.body);
	try {
		const foundRecipe = await Recipe.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		console.log(`🚀 ~ app.get ~ foundRecipes:`, foundRecipe);
		return res.status(200).json(foundRecipe);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: 'Error while retrieving recipes', error });
	}
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:id', async (req, res) => {
	try {
		const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
		console.log(`🚀 ~ app.get ~ foundRecipes:`, deletedRecipe);
		return res.status(200).json(deletedRecipe);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: 'Error while retrieving recipes', error });
	}
});

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
