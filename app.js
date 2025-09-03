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
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((res) =>
    console.log(
      `connected to DB successfully. Database name = ${res.connections[0].name}`
    )
  )
  .catch((error) => console.log(error));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  Recipe.find({})
    .then(() => {
      res.send("<h1>LAB | Express Mongoose Recipes</h1>");
    })
    .catch((err) => {
      console.log(err);
    });
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post(`/recipes`, async (req, res) => {
  try {
    await Recipe.create({
      title: req.body.title,
      instructions: req.body.instructions,
    });
  } catch (error) {
    console.log(error);
  }
  res.send(error);
});

//  Iteration 4 - Get All Recipes
app.get("/recipes", async (req, res) => {
  try {
    const allRecipes = await Recipe.find({});
    res.json(allRecipes);
  } catch (error) {
    console.log(error);
  }
});

//  Iteration 5 - Get a Single Recipe
app.get("/recipes/:id", async (req, res) => {
  try {
    const params = req.params.id;
    const singleRecipe = await Recipe.find({ _id: params });
    res.json(singleRecipe[0]);
  } catch (error) {
    console.log(error);
  }
});
//  Iteration 6 - Update a Single Recipe
app.put("/recipes/:id", async (req, res) => {
  try {
    const params = req.params.id;
    console.log(params);
    await Recipe.findByIdAndUpdate(params, req.body);
    console.log(res);
    res.send("update successful");
  } catch (error) {
    console.log(error);
  }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res) => {
  try {
    const params = req.params.id;
    await Recipe.findByIdAndDelete(params);
    res.send("deleted " + params);
  } catch (error) {
    console.log(error);
  }
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
