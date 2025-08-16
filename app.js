const express = require("express");
const logger = require("morgan");

const PORT = 5005

const app = express();

require('./db')

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

const Recipe = require('./models/Recipe.model')




// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/api/recipes', (req, res) => {

    const { title, instructions, level, ingredients, image, duration, isArchived } = req.body


    Recipe
        .create({ title, instructions, level, ingredients, image, duration, isArchived })
        .then(recipe => res.sendStatus(201))
        .catch(err => res.status(500).json({ code: 500, message: 'server error', details: err }))


})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/api/recipes', (req, res) => {

    Recipe
        .find()
        .then(recipe => res.json(recipe))
        .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))


})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get('/api/recipes/:recipeId', (req, res) => {

    const { recipeId } = req.params

    Recipe
        .findById(recipeId)
        .then(recipe => res.json(recipe))
        .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))


})


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put('/api/recipes/:recipeId', (req, res) => {

    const { recipeId } = req.params
    const { title, instructions, level, ingredients, image, duration, isArchived } = req.body

    Recipe
        .findByIdAndUpdate(recipeId, { title, instructions, level, ingredients, image, duration, isArchived })
        .then(recipe => res.sendStatus(200))
        .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))

})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete('/api/recipes/:recipeId', (req, res) => {

    const { recipeId } = req.params

    Recipe
        .findOneAndDelete(recipeId)
        .then(recipe => res.sendStatus(204))
        .catch(err => res.status(500).json({ code: 500, message: 'server error', ditails: err }))
})



// Start the server
app.listen(PORT, () => console.log(`My first app listening on port ${PORT}!`));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
