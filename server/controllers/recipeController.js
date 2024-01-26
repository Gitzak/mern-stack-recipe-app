const asyncHandler = require("../middleware/asyncHandler");
const { Recipe } = require("../models/Recipe");
const { RecipeRepository } = require("../repositories/recipeRepo");
const { RecipeService } = require("../services/recipeService");

const recipeRepo = new RecipeRepository(Recipe);
const recipeServ = new RecipeService(recipeRepo);

exports.getRecipeById = asyncHandler(async (req, res, next) => {
    const recipe = await recipeServ.getRecipeById(req);
    res.status(recipe.status).json(recipe);
});
