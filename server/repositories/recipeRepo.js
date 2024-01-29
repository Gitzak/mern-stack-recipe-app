const CONSTANTS = require("../constants/index");

class RecipeRepo {
  constructor(recipeModel) {
    this.recipeModel = recipeModel;
  }

  async GetRecipes() {
    return await this.recipeModel.find({});
  }

  async getRecipeById(recipeId) {
    const recipe = await this.recipeModel.findOne({ _id: recipeId });
    // .populate("categories")
    // .populate("comments.userId", "userName") // Populate the username from the User model
    // .exec();
    return recipe;
  }

  async createRecipe(recipe) {
    const newRecipe = await this.recipeModel.create(recipe);
    return newRecipe;
  }

  async UpdateRecipe(id, recipe) {
    return await this.recipeModel.findByIdAndUpdate(id, recipe, {
      runValidators: true,
      new: true,
    });
  }

  async DeleteRecipe(id) {
    return await this.recipeModel.findByIdAndDelete(id);
  }

  async hasRecipes(id) {
    const hasRecipes = await this.recipeModel
      .findOne({
        categories: id,
      })
      .select("_id"); // Selecting only the _id field to optimize the query

    return !!hasRecipes; // Converts the result to a boolean
  }
}

module.exports = { RecipeRepo };
