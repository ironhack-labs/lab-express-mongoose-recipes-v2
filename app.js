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


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
