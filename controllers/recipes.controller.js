
const Recipe = require('../models/recipe.model');
const createError = require('http-errors');

module.exports.create = (req, res, next) => {
    const { body } = req;

    Recipe.findOne({ title: body.title })
        .then((recipe) => {
            if (recipe) next(createError(409, 'Title already exists'))
            else {
                Recipe.create(body)
                    .then((recipe) => res.status(201).json(recipe))
                    .catch((error) => next(error));
            }
        })
        .catch((error) => next(error));
};

module.exports.list = (req, res, next) => {
    Recipe.find()
        .then(recipes => res.json(recipes))
        .catch(error => next(error));
};

module.exports.detail = (req, res, next) => {
    const { id } = req.params;
    Recipe.findById(id)
        .then((recipe) => {
            if (!recipe) next(createError(404, 'Not Found'));
            else res.json(recipe);
        })
        .catch(error => next(error));
} 

module.exports.update = (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
    Recipe.findByIdAndUpdate(id, {body}, {runValidators : true, new : true})
        .then((recipe) => {
            if (!recipe) next(createError(404, 'Not Found'));
            else res.json(recipe);
        })
        .catch(error => next(error));
} 

module.exports.delete = (req, res, next) => {
    const { id } = req.params;
    Recipe.findByIdAndDelete(id)
        .then((recipe) => {
            if (!recipe) next(createError(404, 'Not Found'));
            else res.status(204).send();
        })
        .catch(error => next(error));
} 
