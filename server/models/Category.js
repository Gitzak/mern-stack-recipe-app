const mongoose = require("mongoose");

// Category schema
const categorySchema = new mongoose.Schema(
    {
        categoryName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: "",
        },
        categoryImage: {
            type: String,
            default: "",
        },
        parentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            type: String,
            required: false,
        },
        parentName: {
            type: String,
            required: false,
            default: null,
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category };
