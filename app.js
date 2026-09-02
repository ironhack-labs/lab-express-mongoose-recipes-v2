const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose")

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const Recipe = require("./models/Recipe.model");

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
instruction : req.body.instruction,
level : req.body.level,
Ingredients : req.body.ingredients,
image : req.body.image,
duration : req.body.duration,
isArchieved : req.body.isArchieved,
created : req.body.created,
})
.then ((Recipes) => {
  res.status(201).json("recipe created, all good")
})
.catch((error) => {
res.status(500).json({message: "error, cant create recipe"})
})
})
//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res, next) => {
Recipe.find()
.then((recipes) => {
  res.status(200).json(recipes)
}) 
.catch ((error) => {
    res.status(500).json({message: "error, cant get recipes"})
})

})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:recipeId", async (req, res, next) => {

try {
 const response = await Recipe.findById(req.params.recipeId)
res.json(recipe)
  res.status(200).json(Recipes)
} catch (error) {
 res.status(500).json({message: "error, cant get the recipe"})
}
})


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:recipeId", async (req, res, next) => {

  try {
    
const response = await Recipe.findByIdAndUpdate(req.params.recipeId, {
 title: req.body.title,
instruction : req.body.instruction,
level : req.body.level,
Ingredients : req.body.ingredients,
image : req.body.image,
duration : req.body.duration,
isArchieved : req.body.isArchieved,
created : req.body.created,
}, {
  returnDocument: "after", // give the document after the update has applied
runValidators: true // check schema validators before making modification
})
  res.status(200).json(Recipes)
  } catch (error) {
     res.status(500).json({message: "error, cant change the recipe detail"})
  }
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.put("/recipes/:recipeId", async (req, res, next) => {

  try {
    
const response = await Recipe.findByIdAndDelete(req.params.recipeId, {
 title: req.body.title,
instruction : req.body.instruction,
level : req.body.level,
Ingredients : req.body.ingredients,
image : req.body.image,
duration : req.body.duration,
isArchieved : req.body.isArchieved,
created : req.body.created,
}, {
  returnDocument: "after", // give the document after the update has applied
runValidators: true // check schema validators before making modification
})
  res.status(204).json(Recipes)
  } catch (error) {
     res.status(500).json({message: "error, cant delete the recipe detail"})
  }
})

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
