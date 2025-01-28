const express = require("express");
const {
    createRecipe,
    getAllRecipes,
    getSingleRecipe,
    updateRecipe,
    deleteRecipe
} = require("../controllers/recipes.controllers");

const router = express.Router();

// ROUTES
// GET / route - This is just an example route
router.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

// Iteration 3 - Create a Recipe route
// POST /recipes route
router.post('/recipes', createRecipe);

// Iteration 4 - Get All Recipes
// GET /recipes route
router.get('/recipes', getAllRecipes);

// Iteration 5 - Get a Single Recipe
// GET /recipes/:id route
router.get('/recipes/:id', getSingleRecipe);

// Iteration 6 - Update a Single Recipe
// PUT /recipes/:id route
router.put('/recipes/:id', updateRecipe);

// Iteration 7 - Delete a Single Recipe
// DELETE /recipes/:id route
router.delete('/recipes/:id', deleteRecipe);

module.exports = router;