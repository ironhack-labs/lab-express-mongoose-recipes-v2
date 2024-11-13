const express = require("express");
const logger = require("morgan");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");
const MONGODB_URI = "mongodb://localhost:27017/express-mongoose-recipes-dev";

mongoose
    .connect(MONGODB_URI)
    .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res) => {
    const dataObj = req.body;
    try {
        const apiRes = await createRecipe(dataObj);
        res.status(201).json(apiRes);
    } catch (error) {
        res.status(500).send(error);
    }
})

async function createRecipe(dataObj) {
    return Recipe.create(dataObj)
        .then((recipe) => {
            console.log("Note created ->", recipe);
            return recipe;
        })
        .catch((error) => {
            console.error("Error while creating the recipe ->", error);
            throw new Error("Failed to create the recipe");
        });
}


//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", async (req, res) => {
    try {
        const apiRes = await getAllRecipes();
        res.status(200).json(apiRes);
    } catch (error) {
        res.status(500).send(error);
    }
});

async function getAllRecipes() {
    return Recipe.find({})
        .then((recipes) => {
            console.log("Retrieved recipes ->", recipes.length);
            return recipes;
        })
        .catch((error) => {
            console.error("Error while retrieving recipes ->", error);
            throw new Error("Failed to retrieve recipes");
        });
}


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const apiRes = await getRecipeById(id);
        res.status(200).json(apiRes);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
})

async function getRecipeById(id) {
    const objId = mongoose.Types.ObjectId.createFromHexString(id)
    return Recipe.findById(objId)
        .then((recipe) => {
            console.log("Retrieved recipe ->", recipe);
            return recipe;
        })
        .catch((error) => {
            console.error("Error while retrieving the recipe ->", error);
            throw new Error("Failed to retrieve the recipe");
        });
}

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req, res) => {
    const { id } = req.params;
    const dataObj = req.body;
    try {
        const apiRes = await updateRecipeById(id, dataObj);
        res.status(200).json(apiRes);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
})

async function updateRecipeById(id, dataObj) {
    const objId = mongoose.Types.ObjectId.createFromHexString(id)
    return Recipe.findByIdAndUpdate(objId, dataObj)
        .then((recipe) => {
            console.log("Updated recipe ->", recipe);
            return recipe;
        })
        .catch((error) => {
            console.error("Error while updating the recipe ->", error);
            throw new Error("Failed to update the recipe");
        });
}

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await deleteRecipeById(id);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
})

async function deleteRecipeById(id) {
    const objId = mongoose.Types.ObjectId.createFromHexString(id)
    return Recipe.findByIdAndDelete(objId)
        .then(() => {
            console.log("Deleted recipe!");
        })
        .catch((error) => {
            console.error("Error while deleting the recipe ->", error);
            throw new Error("Failed to delete the recipe");
        });
}


// Start the server
const port = 3000;
app.listen(port, () => console.log('My first app running on: http://localhost:' + port));



//DO NOT REMOVE THE BELOW CODE
module.exports = app;
