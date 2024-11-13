const express = require("express");
const { Schema, mongoose } = require("mongoose");
const logger = require("morgan");
const Recipe = require("./models/Recipe.model")
const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URL = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";
mongoose.connect(MONGODB_URL)
.then((x)=> console.log(`Connected to Mongo with DB name: "${x.connections[0].name}"`))
.catch((e)=>console.log("Error", e));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes',(req,res,next)=>{
    const newRecipe = req.body;

    Recipe
    .create(newRecipe)
    .then((recipeFromDB)=>{
        res.status(201).json(recipeFromDB)
    })
    .catch((e)=>{
        console.log("Error...", e)
        res.status(500).json({error:"Failed to create a new Recipe"})
    })
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', (req,res,next)=>{
    Recipe.find()
    .then((response)=>{res.status(200).json(response)})
    .catch((e)=>{
        console.log("error", e)
        res.status(500).json({message: "Failed to get recipes"})
    })
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:recipeId',(req,res,next)=>{
    const {recipeId} = req.params;
    Recipe.findById(recipeId)
    .then((requestedrecipe) => res.json(requestedrecipe))
    .catch((e)=>{
        console.log("Error getting requested recipe ", e)
        res.status(500).json({error:"Failed to get the recipe!!"})
    })
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.patch("/recipes/:recipeId", (req,res)=>{
    const {recipeId} = req.params;
    const updatedRecipe = req.body;

    Recipe.findByIdAndUpdate(recipeId,updatedRecipe,{new:true})
    .then((response)=> res.json(response))
    .catch((error)=>{
        console.log("error patching the recipe...",e)
        res.status(500).json({error: "Failed to update recipe"})
    })
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:recipeId",(req,res,next)=>{
    const {recipeId}= req.params;

    Recipe.findByIdAndDelete(recipeId).then((deletedRecipe)=>{
        res.status(200).json(deletedRecipe)
    }).catch((e)=>{
        console.log("Error deleting recipe",e)
        res.status(500).json({error: "Failed to Delete a Recipe"})
    })
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
