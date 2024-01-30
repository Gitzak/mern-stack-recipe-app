const asyncHandler = require("../middleware/asyncHandler");
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");
const { CategoryRepository } = require("../repositories/categoryRepo");
const { RecipeRepo } = require("../repositories/recipeRepo");
const { CategoryService } = require("../services/categoryService");

const categoryRepo = new CategoryRepository(Category);
const recipeRepo = new RecipeRepo(Recipe);
const categoryServ = new CategoryService(categoryRepo);

// create new category
exports.createCategory = asyncHandler(async (req, res, next) => {
  // console.log("controller req", req.body);
  const newCategory = await categoryServ.createCategory(req);
  res.status(newCategory.status).json(newCategory);
});

// List all categories
exports.getCategories = asyncHandler(async (req, res, next) => {
  const categories = await categoryServ.getCategories(req);
  res.status(categories.status).json(categories);
});

// get Category by id
exports.getCategoryById = asyncHandler(async (req, res, next) => {
  const category = await categoryServ.getCategoryById(req);
  res.status(category.status).json(category);
});

// update category
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const updatedCategory = await categoryServ.updateCategory(req, res, next);
  res.status(updatedCategory.status).json(updatedCategory);
});

// delete category
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const deleted = await categoryServ.deleteCategory(req);
  res.status(deleted.status).json(deleted);
});
