// Your code here ...
const mongoose = require('mongoose');

const dayjs = require('dayjs');

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        instructions: {
            type: String,
            required: true
        },
        level: {
            type: String,
            enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
        },
        ingredients: {
            type: [String],
        },
        image: {
            type: String,
            default : 'https://images.media-allrecipes.com/images/75131.jpg'
        },
        duration : {
            type: Number,
            min: 0,
        },
        isArchived : {
            type : Boolean,
            default: false,
        },
        created : {
            type: Date,
            // Execute the function for each new Schema instance 
            // to get the current date.
            //      OR
            // default : Date.now(), --> Another aproach
            default : () => dayjs().toDate(),
        }
    }
)

const Recipe = mongoose.model('Recipe', eventSchema)
module.exports = Recipe;