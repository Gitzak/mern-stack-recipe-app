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
    },
    { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category };
