const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose")

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongodb_uri = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev"


mongoose
  .connect(mongodb_uri)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

  const Recipe = require("./models/Recipe.model")

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', (req, res)=> {
    console.log("Recipes reached!")
    console.log(req.body)

    Recipe.create(req.body)
    .then(()=> {
        res.send('Recipe created!')
    })
    .catch((error)=> {
        console.log(error)
        res.json(error)
    })
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', async(req, res) => {
    try {
        const allRecipes = await Recipe.find()
            .then((allRecipes)=> {
                res.json(allRecipes)
                res.send("All good contacting /recipes")
            })
    } catch (error) {
        console.log(error)
        res.json(error)
    }
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:recipeId', async(req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.recipeId)
        res.json(recipe)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:recipeId', async(req, res)=> {
    console.log(req.params)

    try {
        const recipe = await Recipe.findByIdAndUpdate(req.params.recipeId, req.body)
        res.json(recipe)
    } catch (error) {
        console.log(error)
    }
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:recipeId', async(req, res)=> {

    try {
        await Recipe.findByIdAndDelete(req.params.recipeId)
        res.send("recipe deleted")
        
    } catch (error) {
        console.log(error)
        res.json(error)
    }
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
