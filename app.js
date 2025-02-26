const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

const app = express();
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

mongoose
    .connect(MONGODB_URI)
    .then((x) => console.log(`conncted to Mongo! DB name: ${x.connections[0].name}`))
    .catch((err) => console.log("Error connecting to mongo", err)); 



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post("/recipes", (req, res, next) => {
    Recipe.create(req.body)
    .then((createdRecipe) => res.status(201).json(createdRecipe))
    .catch((e) => res.status(500).json({message: "error to create Recipe"}))
});




//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
    Recipe.find()
    .then((allRecipes) => res.status(200).json(allRecipes))
    .catch((e) => res.status(500).json({message: "error getting recipes"}))
} );



//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res) => {
    const recipeId = req.params.id

    Recipe.find(recipeId)
    .then((recipe) => res.status(200).json(recipe))
    .catch((e) => res.status(500).json({message: "error getting recipe"}))
} );




//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/recipes/:id", (req, res) => {
    const recipeId = req.params.id

    Recipe.findByIdAndUpdate(recipeId, req.body, {new: true})
    .then((recipe) => res.status(200).json(recipe))
    .catch((e) => res.status(500).json({message: "error updating recipe"}))
} );




//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:id", (req, res) => {
    const recipeId = req.params.id

    Recipe.findByIdAndDelete(recipeId, req.body, {new: true})
    .then((recipe) => res.status(200).json(recipe))
    .catch((e) => res.status(500).json({message: "error updating recipe"}))
} );




// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
