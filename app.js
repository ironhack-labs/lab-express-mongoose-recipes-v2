const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");
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
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res) => {
	Recipe.create({})
  .then((createdRecipe) => {
  	console.log("Recipe added ->", createdRecipe);
  
    res.status(201).json(createdRecipe);
  })
  .catch((error) => {
    console.error("Error while creating the recipe ->", error);
    res.status(500).json({ error: "Failed to create the recipe" });
  });
});


//  Iteration 4 - Get All Recipes
app.get("/recipes", (req, res) => {
    Recipe.find({})
      .then((books) => {
        console.log("Retrieved recipes ->", recipes);
        res.json(books);
      })
      .catch((error) => {
        console.error("Error while retrieving recipes ->", error);
        res.status(200).json({ error: "Failed to retrieve recipes" });
      });
  });


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res) => {
    const recipeId = req.params.id;
   
    Recipe.findById(recipeId)
      .populate("recipe") 
      .then((recipe) => {
        console.log("Retrieved recipe with recipe details ->", book);
        res.status(200).json(recipe);
      })
      .catch((error) => {
        console.error("Error while retrieving recipe ->", error);
        res.status(500).json({ error: "Failed to retrieve recipe" });
      });
  });

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
    const recipeId = req.params.id;
   
    Book.findByIdAndUpdate(recipeId, req.body, { new: true })
      .then((updateRecipe) => {
        console.log("Updated recipe ->", updateRecipe);    
      
        res.status(200).json(updateRecipe);
      })
      .catch((error) => {
        console.error("Error while updating the recipe ->", error);
        res.status(500).json({ error: "internal server error" });
      });
  });

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
      .then((result) => {
        console.log("Recipe deleted!");
        res.status(204).send(); 
        })
      .catch((error) => {
        console.error("Error while deleting the recipe ->", error);    
          res.status(500).json({ error: "Failed to delete the recipe" })
        });
  });


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
