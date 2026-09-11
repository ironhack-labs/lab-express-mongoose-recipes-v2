const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const Recipe = require("./models/Recipe.model");

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) =>
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`,
    ),
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post("/recipes", async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error al crear la receta", error: err.message });
  }
});
//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res) => {
  try {
    const recipe = await Recipe.find();
    res.status(200).json(recipe);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Error al buscar la receta", error: err.message });
  }
});
//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.status(200).json(recipe);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Error al buscar la receta", error: err.message });
  }
});
//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req, res) => {
  try {
    const updateRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );
    res.status(200).json(updateRecipe);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error al actualizar la receta", error: err.message });
  }
});
//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error durante la eliminacion de la receta" });
  }
});
// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
