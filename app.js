const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();
const Recipe = require("./models/Recipe.model")

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
app.post('/recipes',(req, res) => {
    const recipeData = req.body;

    Recipe.create(recipeData)
    .then((newRecipe)=> {
        res.json(newRecipe)
    })
    .catch((error) => {
        console.log("Nothing was created", error)
        res.status(500).json({ error: "Failed to create a new pizza" });
    })
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', (req, res) => {
    Recipe.find()
    .then((allRecipes)=>{
        res.json(allRecipes)
    })
    .catch((error) => {
        console.log("Nothing was get", error)
        res.status(500).json({ error: "Failed" });
    })
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', (req, res) => {
    const {Id} = req.params;

    Recipe.findById(Id)
    .then((foundRecipe) => {
        res.json(foundRecipe)
    })
    .catch((error) => {
        console.log("Error getting recipes", error)
        res.status(500).json({ error: "Failed" });
    })
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.get('/recipes/:id', (req, res) => {
    const {Id} = req.params;
    const updatedData = req.body;

    Recipe.findByIdAndUpdate(Id, updatedData, {new: true})
    .then((updatedRecipe) => {
        res.json(updatedRecipe)
    })
     .catch((error) => {
        console.log("Error updating recipes", error)
        res.status(500).json({ error: "Failed" });
    })
})


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:id', (req, res) => {
    const {Id} = req.params

    Recipe.findByIdAndDelete(Id)

    .then((deleteRecipe) => {
        res.json(deleteRecipe)
    })
    .catch((error) => {
        console.log("Error deleting recipes", error)
        res.status(500).json({ error: "Failed" });
    })
})

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
