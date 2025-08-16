const Recipe = require("./models/Recipe.model");
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
    .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.error("Error connecting to mongo", err));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res, next) => {
    Recipe.create({
        title: req.body.title,
        instructions: req.body.instructions,
        level: req.body.level,
        ingredients: req.body.ingredients,
        image: req.body.image,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created
    })
        .then((createdRecipe) => {
            // console.log("Recipe created ->", createdRecipe);
            res.status(201).json(createdRecipe);
        })
        .catch((err) => {
            // console.error("Error while creating the recipe ->", err);
            res.status(500).json({ error: "Failed to create the recipe" });
        });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res, next) => {
    Recipe.find({})
        .then((recipes) => {
            // console.log("Retrieved recipes ->", recipes);
            res.status(200).json(recipes);
        })
        .catch((err) => {
            // console.error("Error while fetching all the recipes ->", err);
            res.status(500).json({ error: "Failed to retrieve the recipes" });
        });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:recipeId", (req, res, next) => {
    const { recipeId } = req.params;
    Recipe.findById(recipeId)
        .then((recipe) => {
            // console.log("Retrieved recipe ->", recipes);
            res.status(200).json(recipe);
        })
        .catch((err) => {
            // console.error("Error while fetching the recipe ->", err);
            res.status(500).json({ error: "Failed to retrieve the recipe" });
        });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:recipeId", (req, res, next) => {
    const { recipeId } = req.params;
    Recipe.findByIdAndUpdate(recipeId, req.body, { new: true })
        .then((updatedRecipe) => {
            // console.log("Updated recipe ->", recipes);
            res.status(200).json(updatedRecipe);
        })
        .catch((err) => {
            // console.error("Error while updating the recipe ->", err);
            res.status(500).json({ error: "Failed to update the recipe" });
        });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:recipeId", (req, res, next) => {
    const { recipeId } = req.params;
    Recipe.findByIdAndDelete(recipeId)
        .then(() => {
            // console.log("Recipe deleted ->", deletedRecipe);
            res.status(204).send();
        })
        .catch((err) => {
            // console.error("Error while deleting the recipe ->", err);
            res.status(500).json({ error: "Failed to delete the recipe" });
        });
});

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
