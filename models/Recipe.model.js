// we gonna be creating a schema for our model 

const mongoose = require('mongoose');
const {Schema, model} = mongoose;

// Here is where we create the schema for our model
const recipeSchema  = new Schema({
    title: {type: String, required: true, unique:true},
    intructions: { type: String, required: true, unique:true},
    level: {type: String, enum:['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']}, 
    ingredients: {type: [String]},
    image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
    duration: {type: Boolean, default:false},
    isArchived: {type: Date, default: Date.now}
})


// and here is where we effectivelly create our model 
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports= Recipe;
