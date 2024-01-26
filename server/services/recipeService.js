const CONSTANTS = require("../constants");
const config = require("./../config/keys");

class RecipeService {
  constructor(recipeRepo) {
    this.recipeRepo = recipeRepo;
  }

  async GetRecipes(req) {
    const response = {};
    const recipes = await this.recipeRepo.GetRecipes();
    if (!recipes) {
      response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
      throw new Error("Couldn't retrieve recipes");
    }
    response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
    response.data = recipes;
    return response;
  }

  async DeleteRecipe(req) {
    const response = {};
    const { id } = parseInt(req.params);
    const recipe = await this.recipeRepo.DeleteRecipe(id);
    if (!recipe) {
      response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
      throw new Error("Couldn't delete this recipe");
    }
    return response;
  }

  async UpdateRecipe(req) {
    const response = {};
    const {
      body: {
        name,
        ingredients,
        rating,
        userOwner,
        categories,
        nutrition,
        recipeImages,
        comments,
      },
    } = req;
    const { id } = parseInt(req.params);
    const newRecipe = await this.recipeRepo.UpdateRecipe(id, {
      name,
      ingredients,
      rating,
      userOwner,
      categories,
      nutrition,
      recipeImages,
      comments,
    });
    if (!newRecipe) {
      response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
      throw new Error("Couldn't update the recipe");
    }
    return response;
  }
}
module.exports = { RecipeService };
