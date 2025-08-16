const Recipe = require("../models/Recipe.model");

// Iteration 3 - Create a Recipe route
// POST /recipes route
const createRecipe = (req, res) => {
    const { title, instructions, level, ingredients, image, duration } = req.body;
    Recipe.create({ title, instructions, level, ingredients, image, duration })
        .then(recipe => res.status(201).json(recipe))
        .catch(err => res.status(500).json(err));
};

// Iteration 4 - Get All Recipes
// GET /recipes route
const getAllRecipes = (req, res) => {
    Recipe.find()
        .then(recipes => res.status(200).json(recipes))
        .catch(err => res.status(500).json(err));
};

// Iteration 5 - Get a Single Recipe
// GET /recipes/:id route
const getSingleRecipe = (req, res) => {
    const { id } = req.params;
    Recipe.findById(id)
        .then(recipe => res.status(200).json(recipe))
        .catch(err => res.status(500).json(err));
};

// Iteration 6 - Update a Single Recipe
// PUT /recipes/:id route
const updateRecipe = (req, res) => {
    const { id } = req.params;
    Recipe.findByIdAndUpdate(id, req.body, { new: true })
        .then(updatedRecipe => res.status(200).json(updatedRecipe))
        .catch(err => res.status(500).json(err));
};

// Iteration 7 - Delete a Single Recipe
// DELETE /recipes/:id route
const deleteRecipe = (req, res) => {
    const { id } = req.params;
    Recipe.findByIdAndDelete(id)
        .then(() => res.status(204).send())
        .catch(err => res.status(500).json(err));
};

module.exports = {
    createRecipe,
    getAllRecipes,
    getSingleRecipe,
    updateRecipe,
    deleteRecipe
};