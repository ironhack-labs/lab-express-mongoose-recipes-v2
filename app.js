const express = require("express");
const logger = require("morgan");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// ✅ necesario para leer req.body en POST/PUT con x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
    .connect(MONGODB_URI)
    .then((x) =>
        console.log(
            `Connected to Mongo! Database name: "${x.connections[0].name}"`
        )
    )
    .catch((err) => console.error("Error connecting to mongo", err));

// Iteration 2 - Create a Recipe model
// (En este lab suele ir en /models/Recipe.model.js, pero aquí lo dejo inline para que el archivo cumpla ya)
const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
    title: { type: String, required: true, trim: true },
    instructions: { type: String, required: true, trim: true },
    level: { type: String, enum: ["Easy", "Medium", "Hard"] },
    ingredients: { type: [String], default: [] },
    cuisine: { type: String, trim: true },
    dishType: { type: String, trim: true },
    image: { type: String, trim: true },
    duration: { type: Number, min: 0 },
});

const Recipe = model("Recipe", recipeSchema);

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
            cuisine,
            dishType,
            image,
            duration,
        } = req.body;

        // si ingredients viene como string "a, b, c" lo convertimos a array
        const ingredientsArray =
            typeof ingredients === "string"
                ? ingredients
                    .split(",")
                    .map((i) => i.trim())
                    .filter(Boolean)
                : Array.isArray(ingredients)
                    ? ingredients
                    : [];

        const newRecipe = await Recipe.create({
            title,
            instructions,
            level,
            ingredients: ingredientsArray,
            cuisine,
            dishType,
            image,
            duration: duration !== undefined ? Number(duration) : undefined,
        });

        res.status(201).json(newRecipe);
    } catch (err) {
        res.status(500).json({ message: "Error creating recipe", error: err });
    }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res) => {
    try {
        const recipes = await Recipe.find().sort({ title: 1 });
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ message: "Error getting recipes", error: err });
    }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        const recipe = await Recipe.findById(id);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.status(200).json(recipe);
    } catch (err) {
        res.status(500).json({ message: "Error getting recipe", error: err });
    }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        const updateData = { ...req.body };

        // convertir ingredients si viene como string
        if (typeof updateData.ingredients === "string") {
            updateData.ingredients = updateData.ingredients
                .split(",")
                .map((i) => i.trim())
                .filter(Boolean);
        }

        if (updateData.duration !== undefined) {
            updateData.duration = Number(updateData.duration);
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.status(200).json(updatedRecipe);
    } catch (err) {
        res.status(500).json({ message: "Error updating recipe", error: err });
    }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        const deletedRecipe = await Recipe.findByIdAndDelete(id);

        if (!deletedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting recipe", error: err });
    }
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
