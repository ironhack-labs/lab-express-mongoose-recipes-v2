const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";
mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

// POST /recipes route - Create a Recipe
app.post('/recipes', (req, res) => {
    Recipe.create({
        title: req.body.title,
        instructions: req.body.instructions,
        level: req.body.level,
        ingredients: req.body.ingredients,
        image: req.body.image,
        duration: req.body.duration,
        isArchived: req.body.isArchived
    }).then(createdRecipe => {
        res.status(201).json(createdRecipe);
    }).catch(err => {
        res.status(500).json({ message: "Error creating a new recipe" });
    });
});

// GET /recipes route - Get All Recipes
app.get('/recipes', (req, res) => {
    Recipe.find({}).then(recipes => {
        res.status(200).json(recipes);
    }).catch(err => {
        res.status(500).json({ message: "Error getting all recipes" });
    });
});

// GET /recipes/:id route - Get a Single Recipe
app.get('/recipes/:id', (req, res) => {
    Recipe.findById(req.params.id)
        .then(recipe => {
            if (recipe) {
                res.status(200).json(recipe);
            } else {
                res.status(404).json({ message: "Recipe not found" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error getting a single recipe" });
        });
});

// PUT /recipes/:id route - Update a Single Recipe
app.put('/recipes/:id', (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedRecipe => {
            if (updatedRecipe) {
                res.status(200).json(updatedRecipe);
            } else {
                res.status(404).json({ message: "Recipe not found" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error updating a single recipe" });
        });
});

// DELETE /recipes/:id route - Delete a Single Recipe
app.delete("/recipes/:id", (req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then(deletedRecipe => {
            if (deletedRecipe) {
                res.status(200).json({ message: "Recipe deleted" });
            } else {
                res.status(404).json({ message: "Recipe not found" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error deleting a single recipe" });
        });
});

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;