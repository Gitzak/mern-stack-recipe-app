const asyncHandler = require("../middleware/asyncHandler");
const { Recipe } = require("../models/Recipe");

const recipeRepo = new recipeRepository(Recipe);
const recipeServ = new recipeService(recipeRepo);

exports.getRecipeById = asyncHandler(async (req, res, next) => {
    const recipe = await recipeServ.getRecipeById(req);
    res.status(recipe.status).json(recipe);
});
