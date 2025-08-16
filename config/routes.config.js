const express = require('express');
const router = express.Router();
const recipes = require('../controllers/recipe.controller');
const createError = require('http-errors');
const { default: mongoose, mongo } = require('mongoose');

/* Methods */
router.post('/recipes', recipes.create);
router.get('/recipes', recipes.list);
router.get('/recipes/:id', recipes.detail);
router.put('/recipes/:id', recipes.replace);
router.delete('/recipes/:id', recipes.delete);

/* Errors */
router.use('/', (req, res, next) => next(createError(404, 'Route not found')));

router.use((error, req, res, next) => {
    if (error instanceof mongoose.Error.CastError && error.message.includes('_id')) error = createError(404, 'Resource not found');
    else if (error instanceof mongoose.Error.ValidationError) error = createError(400, error);
    else if(!error.status) error = createError(500, error.message);
    const data = {};
    data.message = error.message;
    res.status(error.status).json(data);
});

module.exports = router;