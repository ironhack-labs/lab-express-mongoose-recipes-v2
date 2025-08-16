const mongoose = require("mongoose");


const databaseName = 'express-mongoose-recipes-dev'
const conectionString = `mongodb://localhost/${databaseName}`

mongoose
    .connect(conectionString)
    .then((conectionString) => console.log(`Connected to Mongo! Database name: "${conectionString.connections[0].name}"`))
    .catch((err) => console.error("Error connecting to mongo", err));