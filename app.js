const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model")

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
    .connect(MONGODB_URI)
    .then((x) => console.log(`Conected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch((error) => console.error("Error connecting to mongo", error));

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post("/recipes", (req, res, next) => {
    const newRecipe = req.body;

    Recipe.create(newRecipe)
        .then(recipeFromDB => {
            res.status(201).json(recipeFromDB);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "Failed to create a new recipe" });
        })
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", (req, res, next) => {
    Recipe.find()
        .then(recipesFromDB => {
            res.status(200).json(recipesFromDB);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "Failed to retrieve recipes" });
        });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:id", (req, res, next) => {
    const { id } = req.params;

    Recipe.findById(id)
        .then(recipeFromDB => {
            if(recipeFromDB) {
                res.status(200).json(recipeFromDB);
            } else {
                res.status(404).json({ error: "Recipe not found" });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "Failed to retrieve recipe" });
        });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/recipes/:id", (req, res, next) => {
    const {  id } = req.params;
    const updatedData = req.params;

    Recipe.findByIdAndUpdate(id, updatedData, { new: true })
        .then(updatedRecipe => {
            if(updatedRecipe) {
                res.status(200).json(updatedRecipe);
            } else {
                res.status(404).json({ error: "Recipe not found" });
            }

        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: "Failed to update recipe" })
        });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));

app.delete("/recipes/:id", (req, res, next) => {
    const { id } = req.params;

    Recipe.findByIdAndDelete(id)
        .then(() => {
            res.status(204).send();
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "Failed to delete recipe" });
        });
});

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
