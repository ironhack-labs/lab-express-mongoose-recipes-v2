const router = require('express').Router();
const Recipe = require('../models/Recipe.model');

router.get('/recipes', async (req, res) => {
    try {
        const allRecipes = await Recipe.find();
        res.status(200).json(allRecipes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching recipes' });
    }
});

router.get('/recipes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findById(id);
        res.status(200).json(recipe);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching recipe' });
    }
});

router.post('/recipes', async (req, res) => {
    const {
        title,
        instructions,
        level,
        ingredients,
        image,
        duration,
        isArchived,
        created
    } = req.body;

    try {
        const newRecipe = await Recipe.create({
            title,
            instructions,
            level,
            ingredients,
            image,
            duration,
            isArchived,
            created
        });
        res.status(201).json(newRecipe);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating recipe' });
    }
});

module.exports = router;
