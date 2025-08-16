const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe.model"); // Import the Recipe model

// 🚀 Create a Recipe (POST /recipes)
router.post("/recipes", async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ message: "Error creating recipe", error });
  }
});

// 🚀 Get All Recipes (GET /recipes)
router.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes", error });
  }
});

// 🚀 Get a Single Recipe (GET /recipes/:id)
router.get("/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipe", error });
  }
});

// 🚀 Update a Recipe (PUT /recipes/:id)
router.put("/recipes/:id", async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRecipe)
      return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: "Error updating recipe", error });
  }
});

// 🚀 Delete a Recipe (DELETE /recipes/:id)
router.delete("/recipes/:id", async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe)
      return res.status(404).json({ message: "Recipe not found" });
    res.status(204).send(); // No content response
  } catch (error) {
    res.status(500).json({ message: "Error deleting recipe", error });
  }
});

module.exports = router;
