const express = require("express");
const logger = require("morgan");

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
    .then((x) => console.log("Connected to Mongo! Database name" + `${x.connections[0].name}`)) 
    .catch((err) => console.log("Error connecting to mongo", err)
    )


    const Recipe = require("./models/Recipe.model.js");


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res) => {
    const recipe = await Recipe.create(req.body);
    if(!recipe) {
        res.status(500).json({ message: "Internal Server Error" });
    }
    res.status(201).json(recipe);
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res) => {
    const recipes = await Recipe.find();
    if(!recipes) {
        res.status(500).json({ message: "Internal Server Error" });
    }
    res.status(200).json(recipes);
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if(!recipe) {
        res.status(500).json({ message: "Internal Server Error" });
    }
    res.status(200).json(recipe);
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndUpdate(id, req.body);
    if(!recipe) {
        res.status(500).json({ message: "Internal Server Error" });
    }
    res.status(200).json(recipe);
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndDelete(id);
    if(!recipe) {
        res.status(500).json({ message: "Internal Server Error" });
    }
    res.status(204).json(recipe);
});


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
