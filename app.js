const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const serverErrorMsg = { message: "Internal Server Error" };

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ...

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post("/recipes", async (req, res) => {
  const {
    title,
    instructions,
    level,
    ingredients,
    image,
    duration,
    isArchived,
    created,
  } = req.body;

  const newRecipe = {
    title,
    instructions,
    level,
    ingredients,
    image,
    duration,
    isArchived,
    created,
  };

  try {
    const createdRecipe = await Recipe.create(newRecipe);
    res.status(201).json(createdRecipe);
  } catch (error) {
    if (error.message.includes("validation")) {
      res.status(400).json({ message: "Invalid input" });
    } else {
      res.status(500).json(serverErrorMsg);
    }
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (_, res) => {
  try {
    const allRecipes = await Recipe.find();
    res.json(allRecipes);
  } catch (error) {
    res.status(500).json(serverErrorMsg);
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const notFoundMsg = { message: `No such recipe with id: ${id}` };

  if (!mongoose.isValidObjectId(id)) {
    res.status(404).json(notFoundMsg);
    return;
  }

  try {
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      res.status(404).json(notFoundMsg);
      return;
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json(serverErrorMsg);
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const {
    title,
    instructions,
    level,
    ingredients,
    image,
    duration,
    isArchived,
    created,
  } = req.body;
  const notFoundMsg = { message: `No such human with id: ${id}` };

  if (!mongoose.isValidObjectId(id)) {
    res.status(404).json(notFoundMsg);
    return;
  }

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      {
        title,
        instructions,
        level,
        ingredients,
        image,
        duration,
        isArchived,
        created,
      },
      { new: true }
    );

    res.json(updatedRecipe);
  } catch (error) {
    res.status(400).json({ message: "Invalid Input" });
  }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(404).json({ message: `No such recipe with id: ${id}` });
    return;
  }

  try {
    await Recipe.findByIdAndDelete(id);
  } catch (_) {}

  res.sendStatus(204);
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
