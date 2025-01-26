
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
        .catch(error =>  next(error));
};
