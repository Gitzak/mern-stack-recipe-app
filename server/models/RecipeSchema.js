const mongoose = require('mongoose');



const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: [{ type: String, required: true }], 
    rating: { type: Number, default: 0 },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }],
    recipe_images: [String], 
    comments: [{
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        comment: { type: String, required: true },
        rating: { type: Number, required: true }
    }]
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = { Recipe };