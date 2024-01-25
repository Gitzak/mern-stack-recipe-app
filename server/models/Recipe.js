const mongoose = require("mongoose");

// Comment subdocument schema
const commentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
        },
    },
    { timestamps: true }
);

// Recipe schema
const recipeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        ingredients: [
            {
                type: String,
                required: true,
            },
        ],
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        userOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        categories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
                required: true,
            },
        ],
        nutrition: [
            {
                label: String,
                value: String,
            },
        ],
        recipeImages: [String],
        comments: [commentSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);


