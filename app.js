const express = require("express");
const logger = require("morgan");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
 const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");
 const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev"
 mongoose.connect(MONGODB_URI)
 .then((response) => console.log('conectado al servidor mongoDB'))
 .catch((error) => console.log('error al conectarse a MongoDB'))



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {

    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
    
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes',(req , res) => {
    
  Recipe.create({

    title: req.body.title,
    instructions: req.body.instructions,
    level: req.body.level,
    ingredients: req.body.ingredients,
    image: req.body.image,
    duration: req.body.duration,
    isArchived: req.body.isArchived,
    created: req.body.created

  }).then((createdRecipe) => {

    res.status(201).json(createdRecipe)

  }).catch((e) => {
    
    console.log(e)
    res.status(500).json({message : "error creando receta"})

  })
    
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', (req , res) => {

    Recipe.find()
    .then((allRecipes) => {

        res.status(201).json(allRecipes)

    }).catch((e) => {

        console.log(e)
        res.status(500).json({message : "error recibiendo data"})

    })
    
    
})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', (req , res) => {
    console.log(req.params.id)

    Recipe.findById(req.params.id)
    .then((receta) => {

        res.status(201).json(receta)

    }).catch((e) => {

        console.log(e)
        res.status(500).json({message : "error recibiendo receta unica"})

    })
    
    
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', (req, res) => {

    Recipe.findByIdAndUpdate(req.params.id, req.body, {new : true})
    .then((recetaActualizada) => {
        
        res.status(201).json(recetaActualizada)

    }).catch((e) => {

        console.log(e)
        res.status(500).json({message : 'error'})

    })
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipe/:id', (req , res) => {
    Recipe.findByIdAndDelete(req.params.id)
    .then((recetaEliminada) => {

        res.status(201).json(recetaEliminada)

    }).catch((e) => {

        console.log(e)
        res.status(500).json({message : 'error'})

    })
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
