require('dotenv').config();

const express = require("express");
const logger = require("morgan");
const mongoose = require("./config/.db.config"); // Importar configuración de la base de datos
const routes = require("./config/routes.config"); // Importar configuración de las rutas

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Use routes from routes.config.js
app.use('/', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`My first app listening on port ${PORT}!`));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;