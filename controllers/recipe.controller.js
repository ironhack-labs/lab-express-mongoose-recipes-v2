const createError = require('http-errors');
const Recipe = require('../models/recipe.model');

module.exports.create = (req, res, next) => {
    const { body } = req;
    Recipe.create(body)
        .then((recipe) => res.status(201).json(recipe))
        .catch((error) => next(error));
}

module.exports.list = (req, res, next) => {
    Recipe.find()
        .then((recipes) => res.json(recipes))
        .catch((error) => next(error));
}

module.exports.detail = (req, res, next) => {
    const { id } = req.params;

    Recipe.findById(id)
        .then((recipe) => {
            if (!recipe) next(createError(404, 'Recipe not found'))
            else res.json(recipe);
        })
        .catch((error) => next(error))
}

module.exports.replace = (req, res, next) => {
    const { id } = req.params;
    const { body } = req;

    Recipe.findOneAndReplace({ _id:id }, body, {runValidators: true, new: true })
        .then((recipe) => {
            if (!recipe) next(createError(404, 'Recipe not found'))
            else res.status(200).json(recipe);
        })
        .catch((error) => next(error));
}

module.exports.delete = (req, res, next) => {
    const { id } = req.params;

    Recipe.findByIdAndDelete(id)
        .then((recipe) => {
            if (!recipe) next(createError(404, 'Recipe not found'))
            else res.status(204).send();
        })
        .catch((error) => next(error));
}