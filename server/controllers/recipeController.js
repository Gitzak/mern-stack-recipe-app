const { RecipeService } = require("../services/recipeService");
const { RecipeRepo } = require("../repositories/recipeRepo");
const Recipe = require("../models/Recipe");
const asyncHandler = require("../middleware/asyncHandler");

const recipeRepo = new RecipeRepo(Recipe);
const recipeServ = new RecipeService(recipeRepo);

exports.GetRecipes = asyncHandler(async (req, res, next) => {
  const recipes = await recipeServ.GetRecipes();
  res.status(recipes.status).json(recipes);
});

exports.UpdateRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await recipeServ.UpdateRecipe(req);
  res.status(recipe.status).json(recipe);
});

exports.DeleteRecipe = asyncHandler(async (req, res, next) => {
  await recipeServ.DeleteRecipe(req);
  res.status(204).json();
});
