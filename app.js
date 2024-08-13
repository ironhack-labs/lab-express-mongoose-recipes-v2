const express = require("express");
const logger = require("morgan");

const PORT = 5005

const app = express()

require('./db/index')


// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


const Recipe = require('./models/Recipe.model')


app.get('/api/recipes', (req, res) => {

    Recipe
        .find()
        .then(allRecipes => res.status(200).json(allRecipes))
        .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))
});

app.get('/api/recipes/:id', (req, res) => {

    const { id } = req.params

    Recipe
        .findById(id)
        .then(recipe => res.status(200).json(recipe))
        .catch(err => res.status(500).json({ code: 500, message: 'Internal Server Error', details: err }))
})

app.post('/api/recipes', (req, res) => {

    const { title, instructions, level, ingredients, image, duration, isArchived, created } = req.body
    Recipe
        .create({ title, instructions, level, ingredients, image, duration, isArchived, created })
        .then(recipe => res.sendStatus(201))
        .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))
})

app.put('/api/recipes/:id', (req, res) => {

    const { id } = req.params
    const { title, instructions, level, ingredients, image, duration, isArchived, created } = req.body

    Recipe
        //verify res.send(id)
        .findByIdAndUpdate(id, { title, instructions, level, ingredients, image, duration, isArchived, created })
        .then(recipe => res.sendStatus(200).json(updatedRecipe))
        .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))
})

app.delete('/api/recipes/:id', (req, res) => {
    const { id } = req.params

    Recipe
        .findByIdAndDelete(id)
        .then(recipe => res.status(204).send())
        .catch(err => res.status(500).json({ code: 500, message: 'Server error', details: err }))
})


// Start the server
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
