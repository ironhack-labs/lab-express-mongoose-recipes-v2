const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();
const Recipe = require("./models/Recipe.model");
// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
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




// ⭐ CREATE — POST /recipes
app.post("/recipes", (req, res) => {
  Recipe.create(req.body)
    .then((newRecipe) => {
      res.status(201).json(newRecipe);
    })
    .catch((error) => {
      console.error("Error creating recipe:", error);
      res.status(500).json({ message: "Error creating recipe" });
    });
});

// ⭐ READ ALL — GET /recipes
app.get("/recipes", (req, res) => {
  Recipe.find()
    .then((recipes) => {
      res.json(recipes);
    })
    .catch((error) => {
      console.error("Error fetching recipes:", error);
      res.status(500).json({ message: "Error fetching recipes" });
    });
});

// ⭐ READ ONE — GET /recipes/:id
app.get("/recipes/:id", (req, res) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.json(recipe);
    })
    .catch((error) => {
      console.error("Error fetching recipe:", error);
      res.status(500).json({ message: "Error fetching recipe" });
    });
});

// ⭐ UPDATE — PUT /recipes/:id
app.put("/recipes/:id", (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedRecipe) => {
      if (!updatedRecipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.json(updatedRecipe);
    })
    .catch((error) => {
      console.error("Error updating recipe:", error);
      res.status(500).json({ message: "Error updating recipe" });
    });
});

// ⭐ DELETE — DELETE /recipes/:id
app.delete("/recipes/:id", (req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then((deletedRecipe) => {
      if (!deletedRecipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.json({ message: "Recipe deleted successfully" });
    })
    .catch((error) => {
      console.error("Error deleting recipe:", error);
      res.status(500).json({ message: "Error deleting recipe" });
    });
});
//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res) => {
  Recipe.create(req.body)
    .then((newRecipe) => {
      res.status(201).json(newRecipe);
    })
    .catch((error) => {
      console.error("Error creating recipe:", error);
      res.status(500).json({ message: "Error creating recipe" });
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
