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
 
mongoose
  .connect("mongodb://127.0.0.1:27017/mongoose-recipes")
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to mongo", err));


const Recipe = require("./models/Recipe.model");

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', (req, res) => {
    console.log(req.body);
    // req.body contains the data sent by the client. 
    // This must match the structure defined in our Book schema.
    // Recipe.create(req.body)
    // // OR
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
          console.log("Recipe created ->", createdRecipe);
          res.status(201).json(createdRecipe);
    })
      .catch((error) => {
        console.error("Error while creating the recipe ->", error);
        res.status(500).json({ error: "Failed to create the recipe" });
      });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', (req, res) => {
    Recipe.find().then((allRecipes)=> {
        res.status(200).json(allRecipes);
    }).catch((error)=>{
        res.status(500).json({ message: "Error while retrieving all recipes"})
    })
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', (req, res) => {
    Recipe.findById(req.params.id).then((recipe)=> {
        res.status(200).json(recipe);
    }).catch((error)=>{
        res.status(500).json({ message: "Error while retrieving the recipe"})
    })
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((updatedRecipe)=> {
        res.status(200).json(updatedRecipe);
    }).catch((error)=>{
        res.status(500).json({ message: "Error while updating the single recipe"})
    })
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:id', (req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
    .then(()=> {
        res.status(204).send();
    }).catch((error)=>{
        res.status(500).json({ message: "Error while attempting to delete a recipe"})
    })
});


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
