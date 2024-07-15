// const router = require('express').Router();
// const { trusted } = require('mongoose'); // ??????
// const Recipe = require('../models/Recipe.model');

// router.post('/recipes', async (req, res, next) => {
// 	try {
// 		const {
// 			title,
// 			instructions,
// 			level,
// 			ingredients,
// 			image,
// 			duration,
// 			isArchived,
// 			created,
// 		} = req.body;

// 		const newRecipe = await Recipe.create(req.body);

// 		res.status(201).json(newRecipe);
// 	} catch (error) {
// 		res.status(500).json({ message: 'Error while creating a new recipe' });
// 	}
// });

// module.exports = router;
