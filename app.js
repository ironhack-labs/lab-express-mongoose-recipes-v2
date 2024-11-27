const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

// app.js
//...

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
    .connect(MONGODB_URI)
    .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.error("Error connecting to mongo", err));

// ...

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post('/api/recipes', (req, res) => {
    const { title,
        instructions,
        level,
        ingredients,
        image,
        duration,
        isArchived,
        created } = req.body

    Recipe

        .create({
            title,
            instructions,
            level,
            ingredients,
            image,
            duration,
            isArchived,
            created
        })
        .then(createdRecipe => res.status(201).json(createdRecipe))
        .catch(err => {
            console.log('error ->', err)
            res.status(500).json({ message: 'Error creating a recipe', error: err })
        })
})
//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get('/recipes', (req, res) => {

    Recipe
        .find()
        .then(recipes => res.status(201).json(recipes))
        .catch(err => {
            console.log('error ->', err)
            res.status(500).json({ message: 'Error getting all the recipes', error: err })
        })
})
//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get('/recipes/:id', (req, res) => {

    const { id } = req.params

    Recipe
        .findById(id)
        .then(recipe => res.status(201).json(recipe))
        .catch(err => {
            console.log('error ->', err)
            res.status(500).json({ message: 'Error getting the recipe', error: err })
        })
})
//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put('/recipes/:id', (req, res) => {
    const { id } = req.params

    const { title,
        instructions,
        level,
        ingredients,
        image,
        duration,
        isArchived,
        created } = req.body

    Recipe
        .findByIdAndUpdate(id,
            {
                title,
                instructions,
                level,
                ingredients,
                image,
                duration,
                isArchived,
                created
            })
        .then(recipe => res.status(201).json(recipe))
        .catch(err => {
            console.log('error ->', err)
            res.status(500).json({ message: 'Error updating the recipe', error: err })
        })
})
//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete('/recipes/:id', (req, res) => {
    const { id } = req.params

    Recipe
        .findByIdAndDelete(id)
        .then(recipe => res.status(201).json(recipe))
        .catch(err => {
            console.log('error ->', err)
            res.status(500).json({ message: 'Error deleting the recipe', error: err })
        })
})

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
