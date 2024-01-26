const { RecipeService } = require("../services/recipeService");
const { RecipeRepository } = require("../repositories/recipeRepo");
const Recipe = require("../models/Recipe");
const CONSTANTS = require("../constants/index");
const asyncHandler = require("../middleware/asyncHandler.js");

const recipeRepo = new RecipeRepository(Recipe);
const recipeServ = new RecipeService(recipeRepo);

// Create a new Recipe
exports.createRecipe = asyncHandler(async (req, res, next) => {
  const newRecipe = await recipeServ.createRecipe(req);
  res.status(newRecipe.status).json(newRecipe);
});
