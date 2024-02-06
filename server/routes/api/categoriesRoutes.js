const express = require("express");
const upload = require("../../middleware/multer");
const { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } = require("../../controllers/categoryController");
const router = express.Router();


// Create a new Category
router.post("/", upload.single("image"), createCategory);
// List all the Category
router.get("/", getCategories);
// Get Category by ID
router.get("/:id", getCategoryById);
// Update the Category data
router.put("/update/:id", upload.single("image"), updateCategory);
// Delete a Category
router.delete("/delete/:id", deleteCategory);

module.exports = router;
