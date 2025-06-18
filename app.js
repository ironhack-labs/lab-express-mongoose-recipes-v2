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
const RecipeModel = require("./models/Recipe.model");
const MONGODB_URL = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";
mongoose
.connect(MONGODB_URL)
.then((res)=>{ console.log(`Connencted to Mongo! Database name: ${res.connections[0].name}`)})
.catch((err)=>{console.error("errorMessage:", err)})


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', (req, res)=>{
    RecipeModel.create(req.body)
    .then((createdRecipe)=>{
        console.log("recipe created!")
        res.status(201).json(createdRecipe);
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).json({message: "Error while creating a new recipe"})
    })
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res)=>{
    try {
        const allRecipes = await RecipeModel.find();
        res.status(200).json(allRecipes);

        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res)=>{
   RecipeModel.findById(req.params.id)
   .then((recipe)=>{
    console.log(recipe);
    res.status(200).json(recipe)
   })
   .catch((error)=>{
    res.status(500).json(error);
   })
   
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.patch("/recipes/:id", async (req, res)=>{
    try {
       updatedRecipe = await RecipeModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
       res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(500).json(error);
    }
  
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res)=>{
    RecipeModel.findByIdAndDelete(req.params.id)
    .then((deletedRecipe)=>{
        res.status(200).json(deletedRecipe)
    })
    .catch((error)=>{
        res.status(500).json(error)
    })
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
