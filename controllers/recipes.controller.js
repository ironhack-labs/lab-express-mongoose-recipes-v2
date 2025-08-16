const createError = require("http-errors");
const Recipe = require("../models/Recipe.model");

// Iteration 3
module.exports.create = (req, res, next) => {
  const { body } = req;
  Recipe.create(body)
    .then((recipe) => res.status(201).json(recipe))
    .catch((error) => next(error));
};

// Iteration 4
module.exports.list = (req, res, next) => {
  Recipe.find()
    .then((recipes) => res.status(200).json(recipes))
    .catch((error) => next(error));
};

// Iteration 5
module.exports.detail = (req, res, next) => {
  const { id } = req.params;

  Recipe.findById(id)
    .then((recipe) => {
      if (!recipe) next(createError(404, "Recipe not found"));
      else res.status(200).json(recipe);
    })
    .catch((error) => next(error));
};

// Iteration 6
module.exports.update = (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  console.log('Request body:', body);

  Recipe.findByIdAndUpdate(id, { body }, { runValidators: true, new: true })
    .then((recipe) => {
      if (!recipe) next(createError(404, "Not Found"));
      else res.json(recipe);
    })
    .catch((error) => next(error));
};

// Iteration 7
module.exports.delete = (req, res, next) => {
  const { id } = req.params;

  Recipe.findByIdAndDelete(id)
    .then((recipe) => {
      if (!recipe) next(createError(404, "Error while deleting recipe"));
      else res.status(204).send();
    })
    .catch((error) => next(error));
};
