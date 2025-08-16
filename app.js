const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
require ('dotenv').config()


const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

const MONGODB_URI = "mongodb+srv://zomgbat:mongodb2020@cluster0.zz2tv5x.mongodb.net/recipes";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

// ...



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res)=>{

 
Recipe.create ({

    title: req.body.title, 
    level: req.body.level,
    instructions: req.body.instructions, 
    cusine: req.body.cusine, 
    dishType: req.body.dishType, 
    image: req.body.image,
    duration: req.body.duration, 
    creator: req.body.creator, 

})
.then((createdRecipe) => {
      res.status(200).json(createdRecipe);
    })
    .catch((error) => {


        console.error("Error while creating recipes ->", error);


        res.status(500).json({ error: "Failed to create recipes" });
      });
    });

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", (req, res)=>{
    Recipe.find()
    .then((allRecipes) => {
      console.log("All Recipes", Recipes);
  
      res.status(200).json(allRecipes);
    })
    .catch((error) => {
      console.error("Error while retrieving All Recipes ->", error);
      res.status(500).json({ error: "Failed to retrieve All Recipes" });
    });
})



//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:id", (req, res)=>{

    Recipe.findbyId(req.params.id)
    .then((recipe) => {
        console.log("Specific Recipe", recipe);
    
        res.status(200).json(recipe);
      })
      .catch((error) => {
        console.error("Error while retrieving a specific recipe ->", error);

        res.status(500).json({ error: "Failed to retrieve a specific recipe" });
      });
    })    





//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/recipes/:id", (req, res)=>{

    Recipe.findbyIdAndUpdate(req.params.id, req.body, { new: true})



    .then((updatedRecipe) => {
        console.log("Updates specific Recipe", recipe);
    
        res.status(200).json(updatedRecipe);
      })
      .catch((error) => {
        console.error("Error while updating a specific recipe  ->", error);
        res.status(500).json({ error: "Failed to update a specific recipe" });
      });
    })



//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("y", (req, res)=>{

    Recipe.findbyIcAndDelete(req.params.id)



    .then(() => {
        console.log("Updates specific Recipe", recipe);
    
        res.status(204).send;
      })
      .catch((error) => {
        console.error("Error while deleting a recipe  ->", error);
        res.status(500).json({ error: "Failed to delete recipe" });
      });
    })




// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
