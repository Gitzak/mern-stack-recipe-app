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

  async createRecipe(req) {
    const response = {};
    try {
      // Extract data from the request

      const {
        name,
        ingredients,
        rating,
        userOwner,
        nutrition,
        comments,
        categories,
        recipeImages,
      } = req.body;
      const newRecipe = {
        name,
        ingredients,
        rating,
        userOwner,
        nutrition,
        // recipeImages: imagesUrls,
        comments,
        categories,
      };

      // Create the recipe
      const recipe = await this.recipeRepo.createRecipe(newRecipe);
      if (!recipe) {
        response.message = CONSTANTS.SERVER_ERROR;
        response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
        return response;
      }

      response.message = CONSTANTS.RECIPE_CREATED;
      response.status = CONSTANTS.SERVER_CREATED_HTTP_CODE;
      response.data = recipe;
      return response;
    } catch (error) {
      response.message = CONSTANTS.SERVER_ERROR;
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
      return response;
    }
  }

  async getRecipeById(req) {
    const response = {};
    const recipeId = req.params.id;
    // console.log(recipeId);
    const recipe = await this.recipeRepo.getRecipeById(recipeId);
    if (!recipe) {
      response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
      throw new Error("Couldn't retrieve recipe");
    }
    response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
    response.data = recipe;
    return response;
  }

  async DeleteRecipe(req) {
    const response = {};
    const { id } = req.params;
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
      name,
      ingredients,
      rating,
      userOwner,
      categories,
      nutrition,
      recipeImages,
      comments,
    } = req.body;

    const id = req.params.id;

    try {
      const updatedRecipe = await this.recipeRepo.UpdateRecipe(id, {
        name,
        ingredients,
        rating,
        userOwner,
        categories,
        nutrition,
        recipeImages,
        comments,
      });

      if (!updatedRecipe) {
        response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
        throw new Error("Couldn't update the recipe");
      }

      response.status = 200;
      response.data = updatedRecipe;

      return response;
    } catch (error) {
      response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
      response.error = error.message;
      throw error;
    }
  }
}
module.exports = { RecipeService };
