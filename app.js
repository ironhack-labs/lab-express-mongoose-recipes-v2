const express = require("express");
const logger = require("morgan");
const RecipeModel = require("./models/Recipe.model");
const app = express();
const mongoose = require("mongoose");

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(
      `Connected to OUR ---- Mongo! Database name: ${x.connections[0].name}`
    )
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
// app.get("/", (req, res) => {
//   res.send("<h1>LAB | Express Mongoose Recipes</h1>");
// });

app.post("/recipes", (req, res) => {
  RecipeModel.create({
    title: req.body.title,
    instructions: req.body.instructions,
    level: req.body.level,
    ingredients: req.body.ingredients,
    image: req.body.image,
    duration: req.body.duration,
    isArchived: req.body.isArchived,
    created: req.body.created,
  })
    .then((createRecipe) => {
      res.status(201).json(createRecipe);
      console.log("new recipe created", RecipeModel);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error creating recipe", error });
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", (req, res) => {
  RecipeModel.find({})
    .then((allRecipes) => {
      console.log("all recipes", allRecipes);
      res.status(200).json(allRecipes);
    })
    .catch((err) => {
      console.log("Oups,", err);
      res.status(500).json({ error: "Failed to retrieve recipes" });
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:id", (req, res) => {
  // const recipeId = req.params.id;
  RecipeModel.findById(req.params.id)
    .then((oneRecipe) => {
      console.log("one recipe", oneRecipe);
      res.status(200).json(oneRecipe);
    })
    .catch((err) => {
      console.log("Oups,", err);
      res.status(500).json({ error: "Failed to retrieve recipe" });
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/recipes/:id", (req, res) => {
  RecipeModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((oneRecipe) => {
      console.log("one recipe", oneRecipe);
      res.status(200).json(oneRecipe);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "failed to update the recipe" });
    });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res) => {
  RecipeModel.findByIdAndDelete(req.params.id)
    .then((oneRecipe) => {
      console.log("one recipe", oneRecipe);
      res.status(204).json(oneRecipe);
    })
    .catch((err) => {
      console.log("Oups,", err);
      res.status(500).json({ error: "Failed to retrieve recipe" });
    });
});

// Start the server

app.listen(3000, () => console.log(`My first app listening on port!`));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
