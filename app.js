const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const RecipeModel = require("./models/Recipe.model");

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
    try {
        const createdRecipe = await RecipeModel.create(req.body);
        console.log("here is created recipe:", createdRecipe);
        res.status(201).json(createdRecipe);
    } catch (err) {
        console.log(err);
        res.status(500).json({errorMessage: "trouble creating a recipe"});
    }
})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
    RecipeModel.find()
    .then((allofRecipes) => {
        console.log("here are the recipes:", allofRecipes);
        res.status(200).json(allofRecipes);
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({errorMessage:"trouble finding the recipes"});
    });
})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipe/:recipeId", (req,res) => {
    const {recipeId} = req.params;
    RecipeModel.findById(recipeId)
    .then((oneRecipe) => {
        console.log ("here is one recipe:", oneRecipe);
        res.status(200).json(oneRecipe);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({errorMessage:"trouble finding the recipes"});
    });
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:recipeId", async (req,res) => {
    try {
        const updatedRecipe = await RecipeModel.findOneAndReplace (
            {_id: req.params.recipeId},
            req.body
        );
        console.log("here is the updated recipe:", updatedRecipe);
        res.status(200).json(updatedRecipe);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({errorMessage: "trouble updating the recipe"});
    }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:recipeId", (req,res) => {
    RecipeModel.findByIdAndDelete(req.params.recipeId)
    .then((deletedRecipe) => {
        console.log("here is the deleted recipe:", deletedRecipe);
        res.status(204).json(deletedRecipe);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({errorMessage: "trouble deleting the recipe"});
    });
})



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
