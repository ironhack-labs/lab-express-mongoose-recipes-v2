const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const createError = require('http-errors');
const recipes = require('../controllers/recipes.controller')

router.post('/recipes', recipes.create);
router.get('/recipes', recipes.list);
router.get('/recipes/:id', recipes.detail);
router.put('/recipes/:id', recipes.update);
router.delete('/recipes/:id', recipes.delete);

router.use('/', (req, res, next) => {
    next(createError(404, 'Route not found'))
})

router.use((error, req, res, next) => {
    if (error instanceof mongoose.Error.CastError && error.message.includes('_id')) error = createError(404, 'Resource not found');
    if (error instanceof mongoose.Error.ValidationError) error = createError(409, error);
    else if (!error.status) error = createError(500, error.message);
    const data = {}
    data.message = error.message;
    if (error.errors) {
        data.errors = Object.keys(error.errors)
            .reduce((errors, errorKey) => {
                errors[errorKey] = error.errors[errorKey].message;
                return errors;
            }, {});
    }
    res.status(error.status).json(data);
})
module.exports = router;
