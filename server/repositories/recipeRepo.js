const CONSTANTS = require("../constants/index");

class RecipeRepository {
    constructor(recipeModel) {
        this.recipeModel = recipeModel;
    }

    async createRecipe(recipe) {
        const newRecipe = await this.recipeModel.create(recipe);
        return newRecipe;
    }
}

module.exports = { RecipeRepository };
