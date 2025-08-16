const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

// app.js
//...

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

// ...
const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});




//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', (req, res, next)=>{
    const newPizza= {
        title: req.body.title,
        instructions: req.body.instructions,
        level: req.body.level,
        ingredients: req.body.ingredients,
        image: req.body.image,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created,
    }

    Recipe.create(newRecipe)
    .then((recipeFromDB)=>{
        res.status(201).json(recipeFromDB)
    })
    .catch((error)=>{
        console.log("Error while creating a new recipe", error);
        res.status(500).json({message: "Internal Server Error"})
    })
}
)

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get('/recipes', (req, res, next)=>{

    Recipe.find()
    .then((recipesFromDB)=>{
        res.status(200).json(recipesFromDB)
    })
    .catch((error)=>{
        console.log("Error while getting all recipes", error);
        res.status(500).json({message: "Internal Server Error"})
    })
})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get('/recipes/:id', (req, res, next)=>{
    const {recipeId}= req.params;

   Recipe.findById(recipeId)
    .then((recipeFromDB)=>{
        res.status(200).json(recipeFromDB)
    })
    .catch((error)=>{
        console.log("Error while getting all recipes", error);
        res.status(500).json({message: "Internal Server Error"})
    })
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put('/recipes/:id', (req, res, next)=>{
    const {recipeId}= req.params

    const newDetails= req.body

    Recipe.findByIdAndUpdate(recipeId, newDetails, {new: true})
    .then((recipeFromDB)=>{
        res.status(200).json(recipeFromDB)
    })
    .catch((error)=>{
        console.log("Error while getting all recipes", error);
        res.status(500).json({message: "Internal Server Error"})
    })
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete('/recipes/:id', (req, res, next)=>{
    const {recipeId}= req.params;

    Recipe.findByIdAndDelete(recipeId)
    .then((recipeFromDB)=>{
        res.status(200).json(recipeFromDB)
    })
    .catch((error)=>{
        console.log("Error while getting all recipes", error);
        res.status(500).json({message: "Internal Server Error"})
    })
})

// Start the server
app.listen(4000, () => console.log('My first app listening on port 4000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
