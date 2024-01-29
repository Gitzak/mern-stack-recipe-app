const mongoose = require("mongoose");

// Category schema
const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      // required: [true, "please name the category"],
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
  { timestamps: true },
);

module.exports = mongoose.model("Category", categorySchema);
