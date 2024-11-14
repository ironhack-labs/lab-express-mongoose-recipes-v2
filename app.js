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
    .then((x) => {
        console.log(`Connected to Mongo! Database Name: "${x.connections[0].name}"`)
    })
    .catch((err) => {
        console.log(err, "error connecting to Mongo DB")
    })


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
    .then(response => {
        res.json(response).status(201)
    })
    .catch(err => {
        console.log(err)
        res.status(500)})
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get('/recipes', (req, res) => {

    Recipe.find()
    .then((response) => {
        res.status(200).json(response)
    })
    .catch((err) => {
        console.log(err) 
        res.status(500)})
})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get('recipes/:id', (req, res) => {

    const {id} = req.params;

    Recipe.findById(id)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
            res.status(500);
        })
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put('recipe/:id', (req, res) => {

    const {id} = req.params;

    updatedRecipe = req.body;

    Recipe.findByIdAndUpdate(id, updatedRecipe, {new: true})
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => {
            console.log(err)
            res.status(500);
        })
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete('recipe/:id', (res, req) => {
    const {id} = req.params;

    Recipe.findByIdAndDelete(id)
    .then((response) => {
        res.status(200).json(response)
    })
    .catch((err) => {
        console.log(err)
        res.status(500)
    })
})

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
