const express = require("express");
const logger = require("morgan");
const RecipeModel = require("./models/Recipe.model")


const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
// const MONGO_URI =
//   process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Mongoose";

// mongoose
//   .connect(MONGO_URI)
//   .then((x) => {
//     const dbName = x.connections[0].name;
//     console.log(`Connected to Mongo! Database name: "${dbName}"`);
//   })
//   .catch((err) => {
//     console.error("Error connecting to mongo: ", err);
//   });

  const mongoose = require ('mongoose');

  mongoose.connect("mongodb://localhost:27017/Recipes")
  .then(()=>{
      console.log("Connected to the database")
  })
  .catch(err =>console.log(err))

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/create",async (req, res)=> {
    try {
        const createRecipe = await RecipeModel.create(
           req.body
        )
        console.log(createRecipe)
        res.status(201).json(createRecipe)
    } catch (error) { console.log(error)
        
    }
    
    
})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/getRecipes", async (req, res)=> {
    try {
        const recipes = await Recipe.find();
    res.status(200).json(recipes);
        
    } catch (error) { 
        res.status(500).json({ error: 'Error fetching recipes', message: err.message });
    }
    
    
})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const recipe = await Recipe.findById(id);
      if (recipe) {
        res.status(200).json(recipe);
      } else {
        res.status(404).json({ error: 'Recipe not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error fetching recipe', message: err.message });
    }
  });

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    const { title, instructions, level, ingredients, image, duration } = req.body;
  
    try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(id, { title, instructions, level, ingredients, image, duration }, { new: true });
      if (updatedRecipe) {
        res.status(200).json(updatedRecipe);
      } else {
        res.status(404).json({ error: 'Recipe not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error updating recipe', message: err.message });
    }
  });

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete('/recipes/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedRecipe = await Recipe.findByIdAndDelete(id);
      if (deletedRecipe) {
        res.status(200).json({ message: 'Recipe deleted successfully' });
      } else {
        res.status(404).json({ error: 'Recipe not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error deleting recipe', message: err.message });
    }
  });

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
