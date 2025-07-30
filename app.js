const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose")
const Recipe = require('./models/Recipe.model')

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));



// ROUTES
//  GET  / route - This is just an example route



//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', (req, res) => {

    const newRecipe = req.body

    Recipe.create(newRecipe)
        .then(recipeFromDB => {
            res.status(201).json(recipeFromDB)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'impossible create a new recipe'})
        })
    
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', (req, res) => {
    
    Recipe.find({})
        .then(recipesFromDB => {
            res.json(recipesFromDB)
        })
        .catch(err => {
            console.log("Error loading pizzas")
            console.log(err)
            res.status(500).json({error: "impossible loading pizza list"})
        })
});


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:recipeId', (req, res) => {

    const {recipeId} = req.params

    Recipe.findById(recipeId)
    .then(recipeFromDB => {
        res.json(recipeFromDB)
    })
    .catch(err => {
        console.log("error")
        res.status(500).json({error: 'not found'})
    })
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('.recipes/:recipeId', (req, res) => {
    const {recipeId} = req.params
    const newRecipeDetails = req.body

    Recipe.findByIdAndUpdate(recipeId, newRecipeDetails, {new: true})
        .then(recipeFromDB => {
            res.json(recipeFromDB)
        })
        .catch(err => {
             console.log("error", err)
             res.status(500).json({error: 'not found'})
        })

})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:recipeId', (req, res) => {
    const { recipeId } = req.body

    Recipe.findByIdAndDelete(recipeId)
    .then(respons => {
        res.json(response)
    })
    .catch(err => {
             console.log("error", err)
             res.status(500).json({error: 'not found'})
        })


})


// Start the server
app.listen(3002, () => console.log('My first app listening on port 3002!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
