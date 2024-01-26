const express = require("express");
const { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } = require("../../controllers/categoryController");
const router = express.Router();

// Create a new Category
router.post("/", createCategory);
// List all the Category
router.get("/", getCategories);
// Get Category by ID
router.get("/:id", getCategoryById);
// Update the Category data
router.put("/:id", updateCategory);
// Delete a Category
router.delete("/:id", deleteCategory);

module.exports = router;
