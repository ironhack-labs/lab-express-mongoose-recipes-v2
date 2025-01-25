require("dotenv").config();
const express = require("express");
const logger = require("morgan");

require("./config/db.config");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());



// // ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

const routes = require("./config/routes.config");
app.use('/api/', routes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
