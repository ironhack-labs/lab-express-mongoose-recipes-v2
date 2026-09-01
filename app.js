const express = require("express");
const logger = require("morgan");
const connectDB = require("./db/connect.js");
const Recipe = require("./models/Recipe.model.js");
const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post("/recipes", async (req, res) => {
  try {
    const {
      title,
      instructions,
      level,
      ingredients,
      image,
      duration,
      isArchived,
    } = req.body;

    const created = await Recipe.create({
      title,
      instructions,
      level,
      ingredients,
      image,
      duration,
      isArchived,
    });

    res.status(201).json({ message: "Recipe created successfully", created });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res.status(409).json({ message: "This recipe was already created" });
    }
    res.status(500).json(error);
  }
});
//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();

    res.status(200).json(recipes);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);

    res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const {
      title,
      instructions,
      level,
      ingredients,
      image,
      duration,
      isArchived,
    } = req.body;

    const created = await Recipe.findByIdAndUpdate(id, {
      title,
      instructions,
      level,
      ingredients,
      image,
      duration,
      isArchived,
    });

    res.status(200).json({ message: "Recipe updated successfully", created });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res.status(409).json({ message: "This recipe was already created" });
    }
    res.status(500).json(error);
  }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndDelete(id);

    res.status(204).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Start the server
app.listen(3000, () => {
  console.log("My first app listening on port 3000!");
  connectDB();
});

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
