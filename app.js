const express = require("express");
const logger = require("morgan");
const Recipe = require("./models/Recipe.model");
const app = express();


app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


require("./db");


app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


app.post("/api/recipes", (req, res) => {
    Recipe.create(req.body)
        .then(createdRecipe => res.json(createdRecipe))
        .catch(err => {
            console.log("post fail", err);
            res.status(500).json({ error: "Failed to create recipe" });
        });
});


app.get('/api/recipes', (req, res) => {
    Recipe.find()
        .then(recipes => res.json(recipes))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Failed to fetch recipes" });
        });
});


app.get('/api/recipes/:recipeId', (req, res) => {
    const { recipeId } = req.params;
    Recipe.findById(recipeId)
        .then(recipe => {
            if (!recipe) {
                return res.status(404).json({ error: "Recipe not found" });
            }
            res.json(recipe);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Failed to fetch recipe" });
        });
});


app.put('/api/recipes/:recipeId', (req, res) => {
    const { recipeId } = req.params;
    Recipe.findByIdAndUpdate(recipeId, req.body, { new: true })
        .then(updatedRecipe => {
            if (!updatedRecipe) {
                return res.status(404).json({ error: "Recipe not found" });
            }
            res.json(updatedRecipe);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Failed to update recipe" });
        });
});


app.delete('/api/recipes/:recipeId', (req, res) => {
    const { recipeId } = req.params;
    Recipe.findByIdAndDelete(recipeId)
        .then(removedRecipe => {
            if (!removedRecipe) {
                return res.status(404).json({ error: "Recipe not found" });
            }
            res.json(removedRecipe);
        })
        .catch(err => {
            console.log('Failed to delete', err);
            res.status(500).json({ error: "Failed to delete recipe" });
        });
});

app.listen(3000, () => console.log('My first app listening on port 3000!'));

module.exports = app;