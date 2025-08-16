const mongoose = require("mongoose")

const databaseName = 'express-mongoose-recipes-dev'
const connectionString = `mongodb://127.0.0.1:27017/${databaseName}`

mongoose
    .connect(connectionString)
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error("Error connecting to mongo", err))


