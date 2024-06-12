const router = require("express").Router();
const Recipe = require("../models/Recipe.model");

router.post("/create", async (req, res) => {
  try {
    const createdRecipe = await Recipe.create(req.body);
    res.status(201).json(createdRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const allRecipes = await Recipe.find();
    res.json(allRecipes);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get("/:recipeId", async (req, res) => {
  try {
    const singleRecipes = await Recipe.findById(req.params.recipeId);
    res.json(singleRecipes);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.put("/:recipeId", async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.recipeId,
      req.body,
      { new: true }
    );
    res.json(updatedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.delete("/:recipeId", async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.recipeId);
    res.json({ message: "Recipe Deleted!" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
