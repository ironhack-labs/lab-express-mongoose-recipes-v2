const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// DATABASE
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";
mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

// CREATE
app.post("/recipes", async (req, res) => {
  try {
    const created = await Recipe.create({
      title: req.body.title,
      instructions: req.body.instructions,
      level: req.body.level,
      ingredients: req.body.ingredients,
      image: req.body.image,
      duration: req.body.duration,
      isArchived: req.body.isArchived,
      created: req.body.created, // opcional (schema já tem default)
    });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({
      message: "Error while creating a new recipe",
      error: err.message,
    });
  }
});

// READ ALL
app.get("/recipes", async (req, res) => {
  try {
    const all = await Recipe.find();
    res.status(200).json(all);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while getting all recipes", error: err.message });
  }
});

// READ ONE
app.get("/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json({
      message: "Error while getting a single recipe",
      error: err.message,
    });
  }
});

// UPDATE
app.put("/recipes/:id", async (req, res) => {
  try {
    const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({
      message: "Error while updating a single recipe",
      error: err.message,
    });
  }
});

// DELETE
app.delete("/recipes/:id", async (req, res) => {
  try {
    const deleted = await Recipe.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Recipe not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({
      message: "Error while deleting a single recipe",
      error: err.message,
    });
  }
});

// START SERVER (fora de qualquer rota)
const PORT = process.env.PORT || 5005;
app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);

// ❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
