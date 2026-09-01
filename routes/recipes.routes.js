const express = require("express")
const router = express.Router()

const Recipe = require("../models/Recipe.model")

// Iteration 3 - Create a Recipe
// POST /recipes
router.post("/recipes", async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body)

    res.status(201).json(newRecipe)
  } catch (error) {
    res.status(400).json(error)
  }
})

// Iteration 4 - Get All Recipes
// GET /recipes
router.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find()

    res.status(200).json(recipes)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Iteration 5 - Get a Single Recipe
// GET /recipes/:id
router.get("/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" })
    }

    res.status(200).json(recipe)
  } catch (error) {
    res.status(400).json(error)
  }
})

// Iteration 6 - Update a Single Recipe
// PUT /recipes/:id
router.put("/recipes/:id", async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    )

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" })
    }

    res.status(200).json(updatedRecipe)
  } catch (error) {
    res.status(400).json(error)
  }
})

// Iteration 7 - Delete a Single Recipe
// DELETE /recipes/:id
router.delete("/recipes/:id", async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id)

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" })
    }

    res.status(200).json(deletedRecipe)
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router
