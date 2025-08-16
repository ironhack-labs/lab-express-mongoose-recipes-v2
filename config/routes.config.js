const express = require("express");
const router = express.Router();
const recipes = require("../controllers/recipes.controller");
const createError = require("http-errors");
const mongoose = require("mongoose");

// ROUTES
//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
router.post("/recipes", recipes.create);

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
router.get("/recipes", recipes.list);

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
router.get("/recipes/:id", recipes.detail);

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
router.put("/recipes/:id", recipes.update);

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
router.delete("/recipes/:id", recipes.delete);



/* Error Handling */
router.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

router.use((error, req, res, next) => {
  console.error(error);
  if (
    error instanceof mongoose.Error.CastError &&
    error.message.includes("_id")
  )
    error = createError(404, "Resource not found");
  else if (error instanceof mongoose.Error.ValidationError)
    error = createError(400, error);
  else if (!error.status) error = createError(500, error.message);
  console.error(error);

  const data = {};
  data.message = error.message;
  if (error.errors) {
    data.errors = Object.keys(error.errors).reduce((err, key) => {
      err[key] = error.errors[key].message;
      return err;
    }, {});
  }
  res.status(error.status).json(data);
});

module.exports = router;
