const express = require("express");
const logger = require("morgan");
const Recipe = require("./models/Recipe.model");
const PORT = 3000
const app = express();


// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
require(`./db/database-conection`)


// ROUTES



//  Iteration 3 - Create a Recipe route

app.post('/api/recipes', (req, res) => {


    const { title, level, ingredients, image, duration, isArchived } = req.body

    Recipe
        .create({ title, level, ingredients, image, duration, isArchived })
        .then(newRecipe => res.sendStatus(201))
        .catch(err => res.json({ code: 500, errorDetails: err }))
})

//  Iteration 4 - Get All Recipes
app.get('/api/recipes/', (req, res) => {

    Recipe
        .find()
        .then(allRecipes => res.json(allRecipes))
        .catch(err => res.json({ code: 500, errorDetails: err }))
})


//  Iteration 5 - Get a Single Recipe
app.get('/api/recipes/:recipe_id', (req, res) => {
    const { recipe_id } = req.params

    Recipe
        .findById(recipe_id)
        .then(recipe => res.json(recipe))
        .catch(err => res.json({ code: 500, errorDetails: err }))
})



//  Iteration 6 - Update a Single Recipe
app.put('/api/recipes/:recipe_id', (req, res) => {
    const { recipe_id } = req.params
    const { title, level, ingredients, image, duration, isArchived } = req.body
    Recipe
        .findByIdAndUpdate(recipe_id, { title, level, ingredients, image, duration, isArchived })
        .then(updatedRecipe => res.sendStatus(204))
        .catch(err => res.json({ code: 500, errorDetails: err }))
})


//  Iteration 7 - Delete a Single Recipe
app.delete('/api/recipes/:recipe_id', (req, res) => {
    const { recipe_id } = req.params

    Recipe
        .findByIdAndDelete(recipe_id)
        .then(() => res.sendStatus(204))
        .catch(err => res.json({ code: 500, errorDetails: err }))
})



// Start the server
app.listen(PORT, () => console.log(`My first app listening on port ${PORT}!`));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
