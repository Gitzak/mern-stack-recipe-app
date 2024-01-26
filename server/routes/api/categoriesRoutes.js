const express = require("express");
const { createCategory, updateCategory } = require("../../controllers/categoryController");
const upload = require("../../middleware/multer");
const router = express.Router();

// // Create a new Category
router.post("/", upload.single("image"), createCategory);
// // List all the Category
// router.get("/", getCategories);
// // Get Category by ID
// router.get("/:id", getCategoryById);
// // Update the Category data
router.put("/:id", upload.single("image"), updateCategory);
// // Delete a Category
// router.delete("/:id", deleteCategory);

module.exports = router;
