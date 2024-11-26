const express = require("express");
const logger = require("morgan");
const Recipe = require("./models/Recipe.model")

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

require("./db")

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/api/recipes", (req, res) => {
  Recipe
    .create({
      title: req.body.title,
      instructions: req.body.instructions,
      level: req.body.level,
      ingredients: req.body.ingredients,
      image: req.body.image,
      duration: req.body.duration,
      isArchived: req.body.isArchived,
      created: req.body.created
    }, { new: true })
    .then(createdRecipe => res.json(createdRecipe))
    .catch(err => console.log("post fail", err))


}
)

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/api/recipes', (req, res) => {
  Recipe
    .find()
    .then(recipes => res.json(recipes))
    .catch(err => console.log(err))
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/api/recipes/:recipeId', (req, res) => {
  const { recipeId: _id } = req.params
  Recipe
    .findById(_id)
    .then(recipe => res.json(recipe))
    .catch(err => console.log(err))
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.get('/api/recipes/:recipeId', (req, res) => {
  const { recipeId: _id } = req.params
  Recipe
    .findByIdAndUpdate(_id, {
      title: req.body.title,
      instructions: req.body.instructions,
      level: req.body.level,
      ingredients: req.body.ingredients,
      image: req.body.image,
      duration: req.body.duration,
      isArchived: req.body.isArchived,
      created: req.body.created
    })
    .then(updateRecipe => res.json(updateRecipe))
    .catch(err => console.log(err))
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/api/recipes/:recipeId', (req, res) => {
  const { recipeId: _id } = req.params
  Recipe
    .findByIdAndDelete(_id)
    .then(removeRecipe => res.json(removeRecipe))
    .catch(err => console.log('fallo al borrar', err))

})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
