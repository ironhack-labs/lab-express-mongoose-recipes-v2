const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose")
mongoose.set('runValidators', true)

const Recipe = require("./models/Recipe.model.js")

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

mongoose.connect("mongodb://127.0.0.1:27017/express-recipes")
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error("Error connecting to mongo", err));



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", function (req, res, next) {
    const newRecipe = req.body

    Recipe.create(newRecipe)
        .then((recipeFromDB) => {
            res.status(201).json(recipeFromDB)
        })
        .catch((err) => {
            console.log("Error creating a new recipe in the DB...")
            console.log(err);
            res.status(500).json({ error: "Error creating a new recipe in the DB..." })
        })
})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", function (req, res, next) {

    Recipe.find({})
        .then((allRecipes) => {
            res.status(201).json(allRecipes)
        })
        .catch((err) => {
            console.log("Error creating a new recipe in the DB...")
            console.log(err);
            res.status(500).json({ error: "Error creating a new recipe in the DB..." })
        })
})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:recipeId", (req, res, next) => {

    Recipe.findById(req.params.recipeId)
        .then((recipeFromDb) => {
            res.status(200).json(recipeFromDb)
        })
        .catch(error => {
            console.log("Error getting recipe details from DB...");
            console.log(error);
            res.status(500).json({ error: "Failed to get recipe details" });
        })
})



//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("recipes/:recipeId", (req, res, next) => {

    Recipe.findByIdAndUpdate(req.params.recipeId, req.body, { new: true })
        .then((updateRecipe) => {
            res.status(200).json(updateRecipe)
        })
        .catch(error => {
            console.log("Error updating recipe details...");
            console.log(error);
            res.status(500).json({ error: "Failed to update recipe details" });
        })

})


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:recipeId", (req, res, next) => {

    const { recipeId } = req.params

    Recipe.findByIdAndDelete(recipeId)
        .then((response) => {
            res.json(response)
        })
        .catch((error) => {
            console.error("Error deleting recipe...");
            console.error(error);
            res.status(500).json({ error: "Failed to delete a recipe" });
        })
})

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
