const asyncHandler = require("../middleware/asyncHandler");
const { Category } = require("../models/Category");
const { CategoryRepository } = require("../repositories/categoryRepo");
const { CategoryService } = require("../services/categoryService");

const categoryRepo = new CategoryRepository(Category);
const categoryServ = new CategoryService(categoryRepo);

// create new category
exports.createCategory = asyncHandler(async (req, res, next) => {
    const newCategory = await categoryServ.createCategory(req);
    res.status(newCategory.status).json(newCategory);
});

// update category
exports.updateCategory = asyncHandler(async (req, res, next) => {
    const updatedCategory = await categoryServ.updateCategory(req);
    res.status(updatedCategory.status).json(updatedCategory);
});