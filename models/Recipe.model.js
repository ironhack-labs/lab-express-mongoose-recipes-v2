// Your code here ...

const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

//Create a Schema

const recipeSchema = new Schema({

    title : {type:String, required:true, unique: true},
    instructions : {tyoe:String, required: true},
    level: {type: String, enum:["Easy Peasy", "Amateur Chef", "UltraPro Chef"]},
    ingredients: [String],
    image: { type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
    duration: {type: Number, min: 0},
    isArchived: {type: Boolean, default: false},
    created: {type: Date, default: Date.now}

});

// Create a model

const Recipe = mongose.model("Recipe", recipeSchema);

// Export the model

module.export = Recipe;

