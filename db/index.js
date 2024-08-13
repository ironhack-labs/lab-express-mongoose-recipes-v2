const mongoose = require('mongoose')

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev"

mongoose
    .connect(MONGODB_URI)
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error("Error connecting to mongo", err))
