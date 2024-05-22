const mongoose = require("mongoose")

const databaseName = "express-mongoose-recipes-dev"
const MONGODB_URL = `mongodb://127.0.0.1:27017/${databaseName}`;

mongoose
    .connect(MONGODB_URL)
    .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.error("Error connecting to mongo", err))