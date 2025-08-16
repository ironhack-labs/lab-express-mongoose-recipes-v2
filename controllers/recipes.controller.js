const Recipe = require('../models/Recipe.model');

module.exports.create =  (req, res, next) => {
    const {body} = req;
    Recipe.create(body)
        .then((recipe) => res.status(200).json(recipe))
        .catch(next);
}

module.exports.detail = (req, res, next) => {
    const {id} = req.params;
    Recipe.findById(id)
    .then((recipe) => {
        if(!recipe) {
            res.status(404).json({message: 'Recipe not found'});
        } else {
            res.status(200).json(recipe);
        }
    })
    .catch(next);
}

module.exports.update = (req, res, next) => {
    const {id} = req.params;
    const {body} = req;
    Recipe.findByIdAndUpdate(id, body, {runValidators: true, new: true})
    .then((recipe) => {
        if(!recipe) {
            res.status(404).json({message: 'Recipe not found'});
        } else {
            res.status(200).json(recipe);
        }
        })
    .catch(next);
}

module.exports.delete = (req, res, next) => {
    const {id} = req.params;
    Recipe.findByIdAndDelete(id)
    .then((recipe) => {
        if(!recipe) {
            res.status(404).json({message: 'Recipe not found'});
        } else {
            res.status(204).send();
        }
    })
    .catch(next);
}