require('dotenv').config();
const express = require("express");
const logger = require("morgan");

// Iteration 1 
require('./config/db.config');


const app = express();


// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// ROUTES
const routes = require('./config/routes.config');
app.use('/api/v1/', routes);

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`My first app listening on port ${port}!`));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;