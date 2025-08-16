// Your code here ...

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema ({
    title: {type: String, required: true, unique: true},
    instructions: {type: String, required: true},
    level: {}
})

