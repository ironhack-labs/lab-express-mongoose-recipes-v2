const express = require("express");
const logger = require("morgan");

const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', (req, res) => {
    const newRecipe = req.body;

    Recipe.create(newRecipe)
        .then((createdRecipe) => {
            res.status(201).json(createdRecipe)
        })
        .catch((e) => {
            console.log(e);
            res.status(500).json({ error: "Failed to create a new recipe" });
        })
})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', (req, res) => {
    Recipe.find()
        .then((recipes) => {
            res.status(200).json(recipes)
        })
        .catch(e => {
            console.log(e);
            res.status(500).json({error: "Failed to get list of recipes"});
        })
})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', (req, res) => {
    const {id} = req.params;

    Recipe.findById(id)
        .then((recipe) => {
            res.status(200).json(recipe)
        })
        .catch(e => {
            console.log(e);
            res.status(500).json({error: "Failed to get recipe details"})
        })
})


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', (req, res) => {
    const {id} = req.params;
    const newDetails = req.body;

    Recipe.findByIdAndUpdate(id, newDetails, {new: true})
        .then((updatedRecipe) => {
            res.status(200).json(updatedRecipe)
        })
        .catch(e => {
            console.log(e);
            res.status(500).json({error: "Failed to update recipe"})
        })
})


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:id', (req, res) => {
    const {id} = req.params;

    Recipe.findByIdAndDelete(id)
        .then(()=> {
            res.status(204).send()
        })
        .catch(e => {
            console.log(e)
            res.status(500).json({error: "Failed to delete recipe"})
        })
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
