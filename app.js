const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";
const RecipeModel = "./models/Recipe.model.js";
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log("connecting with Mongo DB ${x.connections[0].name}");
  })
  .catch((err) => {
    console.log("error connecting to mongo", err);
  });

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
app.post("/recipes", (req, res) => {
  RecipeModel.create(req.body)

    .then((theNewReceiptinDB) => {
      console.log("this is the new receipt", theNewReceiptinDB);
      res.status(201).json({ theNewReceiptinDB });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: "Problem creating receipe", err });
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
  RecipeModel.find()
    .then((recipes) => {
      console.log("showing all recipes", recipes);
      res.status(200).json(recipes);
    })
    .catch((err) => {
      console.log("error showing add the receips", err);

      res.status(500).json({ message: "Error while showing all receips" });
    });
});
//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:id", (req, res) => {
  RecipeModel.findById(req.params.id)
    .then((oneRecipe) => {
      console.log("one receipe found", oneRecipe);
      res.status(200).json(oneRecipe);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "problem in in finding one recipe by ID" });
    });
});

app.delete("/recipes/:id", (req, res) => {
  RecipeModel.findByIdUndDelete(req.params.id)

    .then((receipToDelete) => {
      console.log("add a recipe", receipToDelete),
        res.status(200).json(receipToDelete);
    })
    .catch((err) => {
      console.log("err to delete receip", err);
      res.status(500).json({ message: "err in delete a receip" });
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
