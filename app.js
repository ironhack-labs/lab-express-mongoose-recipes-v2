const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require('./models/Recipe.model')

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
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
    Recipe.create(req.body)
        .then((newRecipe) => { 
            res.status(201).json(newRecipe);
        })
        .catch((e) => {
            res.status(500).json({message: "There was an error creating the recipe."})
        })
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get( "/recipes",  ( req, res ) => {
    Recipe.find()
    .then((recipes) => {
        res.status(200).json(recipes);
    })
    .catch((e) => {
        res.status(500).json({message: "There was an error getting the recipes."})
    })
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', (req, res, next) => {
    Recipe.findById(req.params.id)
    .then((oneRecipe) => {
        res.status(200).json(oneRecipe);
    })
    .catch((e) => {
        res.status(500).json({message: "There was an error getting the one specific recipe."})
    })
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', (req,res,next)=>{
    const id = req.params.id;
    Recipe.findByIdAndUpdate(id, req.body, {new: true})
    .then(()=>{
        console.log("Updated");
        res.status(200).json(req.body);
    })
    .catch((err)=> res.status(500).json({message: "There was an error updating the recipe."}))
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res) => {
    const id = req.params.id;
    Recipe.findByIdAndDelete(id)
      .then(() => {
        res.status(204).send()
        })
      .catch((error) => {   
          res.status(500).json({ message: "Failed to delete the recipe" });
      });
  });


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
