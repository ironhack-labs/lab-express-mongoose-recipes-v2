const mongoose = require("mongoose");

async function connectDB() {
  try {
    const connection = await mongoose.connect(
      "mongodb://127.0.0.1:27017/mongoose-recipes-july2026",
    );

    console.log("connected to db ", connection.connections[0].name);
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;
