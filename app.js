const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose")
const Recipe = require("./models/Recipe.model")
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

app.post("/recipes", async (req, res) => {
    const newRecipe = req.body

    try {
        const recipeFromDB = await Recipe.create(newRecipe)
        res.status(201).json(recipeFromDB)
    }
    catch (err) {
        console.log("Error creating a new recipe \n\n", err)
        res.status(500).json(err)
    }
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", async (req,res) => {

    try{
        const recipesFromDB = await Recipe.find({})
        console.log("success getting recipes")
        res.status(200).json(recipesFromDB)
    }
    catch (err){
        console.log("Error getting recipes from DB... \n\n", err)
        res.status(500).json({ error: "Failed to get list of recipes" })
    }

})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:recipeId", async (req,res) => {

    const { recipeId } = req.params

    try{
        const recipesFromDB = await Recipe.findById(recipeId)
        console.log("success getting recipe")
        res.status(200).json(recipesFromDB)
    }
    catch (err){
        console.log("Error getting recipe from DB... \n\n", err)
        res.status(500).json({ error: "Failed to get recipe" })
    }

})


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:recipeId", async (req,res) => {

    const { recipeId } = req.params
    const update = req.body

    try{
        const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, update, {new: true})
        console.log("success updating recipe \n\n", updatedRecipe)
        res.status(200).json(updatedRecipe)
    }
    catch (err){
        console.log("Error getting recipe from DB... \n\n", err)
        res.status(500).json({ error: "Failed to get recipe" })
    }

})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:recipeId", async (req,res) => {

    const { recipeId } = req.params
   
    try{
        const recipeFromDB = await Recipe.findByIdAndDelete(recipeId)
        console.log("success deleting recipe \n\n", recipeFromDB)
        res.status(200).json(recipeFromDB)
    }
    catch (err){
        console.log("Error getting recipe from DB... \n\n", err)
        res.status(500).json({ error: "Failed to get recipe" })
    }

})

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));








//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
