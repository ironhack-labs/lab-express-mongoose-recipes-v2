const mongoose = require('mongoose');
const dayjs = require('../config/dayjs.config')

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Ttile is required'],
        unique: true
    },
    instructions: {
        type: String,
        required: [true, 'Instructions is required']
    },
    level: {
        type: String,
        required : [true, 'Level is required'],
        enum: { 
            values: ['Easy Peasy', 'Amateur Chef', 'UltraPro', 'Chef'],
            message: 'This value is not supported'
        }
    },
    ingredients: {
        type: [ String ],
        required : [true, 'Ingredients is required']
    },
    image: {
        type: String,
        default: 'https://images.media-allrecipes.com/images/75131.jpg'
    },
    duration: {
        type: Number,
        min: [0, 'Duration must be at least 0'],
        required : [true, 'Duration is required']
    },
    isArchived: {
        type: Boolean,
        default: 'false'
    },
    created: {
        type: Date,
        default: dayjs()
    }
    
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
            delete ret._id;
            ret.id = doc.id;
            return ret; 
        }
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;