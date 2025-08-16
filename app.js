const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

const app = express();

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post("/recipes", (req, res) => {
  Recipe.create({
    title: req.body.title,
    instructions: req.body.instructions,
    level: req.body.level,
    ingredients: req.body.ingredients,
    image: req.body.image,
    duration: req.body.duration,
    isArchived: req.body.isArchived,
    created: req.body.created,
  })
    .then((createdRecipe) => {
      console.log("recipe created ::", createdRecipe);
      res.status(201).json(createdRecipe);
    })
    .catch((err) => {
      console.error("Error while creating a recipe::::", err);
      res.status(500).json({ err: "failed to create recipe" });
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
  Recipe.find()
    .then((recipes) => {
      console.log("got all recipes!", recipes);
      res.status(200).json(recipes);
    })
    .catch((err) => {
      console.error("failed to get recipes::", err);
      res.status(500).json({ err: "failed to get recipes" });
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res) => {
  const recipeId = req.params.id;

  Recipe.findById(recipeId)
    .then((recipe) => {
      console.log("got you one recipe ::", recipe);
      res.json(recipe);
    })
    .catch((err) => {
      console.error("failed to get 1 recipe::", err);
      res.status(500).json({ err: "failed to get recipe" });
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/recipes/:id", (req, res) => {
  const recipeId = req.params.id;

  Recipe.findByIdAndUpdate(recipeId, req.body, { new: true })
  .then((updatedRecipe) => {
    console.log("Updated recipe! ::", updatedRecipe);
    res.status(204).json(updatedRecipe);
  })
  .catch((err) => {
    console.error("failed to update recipe::", err);
    res.status(500).json({ err: "failed to update recipe" });
  });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:id", (req, res) => {
    const recipeId = req.params.id;

    Recipe.findByIdAndDelete(recipeId)
    .then((result) => {
        console.log("recipe deleted!!!!!!");
        res.status(204).send();
    })
    .catch((error) => {
        console.error("Error while deleting the recipe ->", error);
        res.status(500).json({ error: "Deleting recipe failed" });
      })
})

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
