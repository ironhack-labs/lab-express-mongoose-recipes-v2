const express = require("express");
const logger = require("morgan");

const app = express();

app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


require('./db')

const Recipe = require('./models/Recipe.model')


app.post('/api/recipes', (req, res) => {

    const { title, instructions, level, ingredients, image, duration, isArchived } = req.body

    Recipe
        .create({ title, instructions, level, ingredients, image, duration, isArchived })
        .then(recipe => res.sendStatus(201))
        .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))
})


app.get('/api/recipes', (req, res) => {

    Recipe
        .find()
        .then(recipes => res.json(recipes))
        .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))
})


app.get('/api/recipes/:recipeId', (req, res) => {

    const { recipeId } = req.params
    const { title, instructions, level, ingredients, image, duration, isArchived } = req.body

    Recipe
        .findById(recipeId)
        .then(recipe => res.json(recipe))
        .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))
})


app.put('/api/recipes/:recipeId', (req, res) => {

    const { recipeId } = req.params
    const { title, instructions, level, ingredients, image, duration, isArchived } = req.body

    Recipe
        .findByIdAndUpdate(recipeId, { title, instructions, level, ingredients, image, duration, isArchived })
        .then(recipe => res.sendStatus(200))
        .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))

})



app.delete('/api/recipes/:recipeId', (req, res) => {

    const { recipeId } = req.params

    Recipe
        .findByIdAndDelete(recipeId)
        .then(recipe => res.sendStatus(200))
        .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))
})


app.listen(5005, () => console.log('My first app listening on port 5005!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
