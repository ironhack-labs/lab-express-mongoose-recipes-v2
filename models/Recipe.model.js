// Your code here ...
// ./models/Book.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const recipeSchema = new Schema({
	title: { type: String, required: true, unique: true },
	instructions: { type: String, required: true },
	level: {
		type: String,
		enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
	},
	image: {
		type: String,
		default: 'https://images.media-allrecipes.com/images/75131.jpg',
	},
	ingredients: { type: [String] },
	duration: { type: Number, min: 0 },
	isArchived: { type: Boolean, default: false },
	created: { type: Date, default: Date.now },
});

// CREATE MODEL
// The model() method defines a model (Book) and creates a collection (books) in MongoDB
// The collection name will default to the lowercased, plural form of the model name:
//                          "Book" --> "books"
const Recipe = mongoose.model('Recipe', recipeSchema);

// EXPORT THE MODEL
module.exports = Recipe;
