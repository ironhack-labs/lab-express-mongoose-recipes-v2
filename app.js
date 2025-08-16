const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const Recipe = require("./models/Recipe.model")

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
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", function (req , res, next) {
    
    const newRecipe = req.body

    Recipe.create(newRecipe)
    .then((recipeNew) => {
        res.status(201).json(recipeNew)
    })
    .catch((error) => {
        res.status(500).json({error: "Error creating recipe"})
    })
})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", function (req , res, next) {

    Recipe.find()
    .then((recipes) => {
        res.status(200).json(recipes)
    })
    .catch((error) => {
        res.status(500).json({error: "Error getting recipes"})
    })
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id" , function (req, res, next) {
    
    const { id } = req.params

    Recipe.findById(id)
    .then((recipe) => {
        res.status(200).json(recipe)
    })
    .catch((error) => {
        res.status(500).json({error: "Error getting recipe"})
    })
})


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id" , function (req, res, next) {
    
    const { id } = req.params

    const newDetails = req.body

    Recipe.findByIdAndUpdate(id, newDetails, { new: true} )
    .then((recipeUpdated) => {
        res.status(200).json(recipeUpdated)
    })
    .catch((error) => {
        res.status(500).json({error: "Error updating recipe"})
    })
})


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id" , function (req, res, next) {

    const { id } = req.params

    Recipe.findByIdAndDelete(id)
        .then (response => {
            res.status(204).json(response)
        })
        .catch((error) => {
        res.status(500).json({error: "Error deleting recipe"})
    })
})



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
