const express = require("express");
const logger = require("morgan");
const mongoose = require('mongoose')
const MONGODB_URL = 'mongodb://127.0.0.1:27017/express-mongoose-recipes-dev'
const Recipe = require('./models/Recipe.model')
const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());



// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

mongoose
.connect(MONGODB_URL)
.then((response)=>{
    console.log(`Connected to Mongo! Database name: ${response.connections[0].name}`)
})
.catch((error)=> console.log(error))


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes',async(req,res)=>{
    const {title,instructions,level,ingredients,duration,isArchive} = req.body
    try {
        await Recipe.create({
            title,
            instructions,
            level,
            ingredients,
            duration,
            isArchive,
        })
        res.status(201).json({message: 'Document Created!'})
    } catch (error) {
        res.status(500).json({messageError: error})
    }
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes',async(req,res)=>{
    
    try {
        const recipes = await Recipe.find()
        res.status(200).json(recipes)
    } catch (error) {
        res.sendStatus(500)
    }
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:recipeId',async(req,res)=>{
    console.log(req.params)
    try {
        const recipe = await Recipe.find({_id: req.params.recipeId})
        res.status(200).json({recipe})
    } catch (error) {
        res.sendStatus(500)
    }
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:recipeId',async(req,res)=>{
    try {
        const UpdatedRecipe = await Recipe.findByIdAndUpdate(req.params.recipeId,req.body, {new: true, runValidators: true})
        if(!UpdatedRecipe){
            res.status(404).json({message: 'Recipe not found'})
        }
        res.status(200).json({message: 'Document updated!'})
    } catch (error) {
        res.sendStatus(500)
    }

})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:recipeId',async(req,res)=>{
    try {
        await Recipe.findByIdAndDelete(req.params.recipeId)
        res.status(204).json({message: 'Document Deleted!'})        
    } catch (error) {
        res.sendStatus(500)
    }
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
