const express = require("express");
const router = express.Router();

const upload = require("../../middleware/multer");

const {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} = require("../../controllers/categoryController");
// // Create a new Category
router.post("/", upload.single("image"), createCategory);
// // List all the Category
router.get("/", getCategories);
// // Get Category by ID
router.get("/:id", getCategoryById);
// // Update the Category data
router.put("/update/:id", updateCategory);
// // Delete a Category
router.delete("/delete/:id", deleteCategory);

module.exports = router;
