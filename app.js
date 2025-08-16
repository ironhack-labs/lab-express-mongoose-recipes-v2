const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();
const recipeRoutes = require("./routes/recipe.routes"); // Import routes

// Middleware
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Database Connection
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

const Recipe = require("./models/Recipe.model");

// Routes
app.use("/api", recipeRoutes); // Use recipe routes with a base path

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

module.exports = app;
