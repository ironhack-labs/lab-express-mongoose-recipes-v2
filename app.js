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
const mongoose = require("mongoose");
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
app.post('/recipes', (req, res) => {

    Recipe.create(req.body)
        .then((recipeFromDB) => {
            console.log(recipeFromDB)
            res.status(201).json(recipeFromDB);
        })
        .catch((error) => {
            console.log("Error creating a new recipe in the DB...");
            console.log(error);
            res.status(500).json({ error: "Failed to create a new recipe" });
        });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', (req, res) => {
    Recipe.find()
        .then((response) => {
            res.status(201).json(response)
        })
        .catch((error) => {
            console.log("Error reading the recipes in the DB...");
            console.log(error);
            res.status(500).json({ error: "Failed to read the recipe" })
        })
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get('/recipes/:id', (req, res) => {
    const { id } = req.query;
    Recipe.find(id)
        .then((recipeFromDB) => {
            res.status(201).json(recipeFromDB)
        })
        .catch((error) => {
            console.log("Error reading recipe by id");
            console.log(error);
            res.status(500).json({ error: "Failed to read the recipe by id" })
        })
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put('/recipes/:id', (req, res) => {
    const { id } = req.params.id;
    const updateData = req.body;

    Recipe.findByIdAndUpdate(id, updateData, { new: true })
        .then((updatedRecipe) => {
            console.log(updatedRecipe);
            res.status(200).json(updatedRecipe);
        })
        .catch((error) => {
            console.log("Error updating recipe by id");
            console.log(error);
            res.status(500).json({ error: "Failed to update the recipe by id" });
        });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete('/recipes/:id', (req, res)=>{

    const {id} = req.params;
    
    Recipe.findByIdAndDelete(id)
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=>{
        console.log("error deleting recipe by id")
        console.log(error)
        res.status(500).json({error: "error deleting recipe by id"})
    })
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
