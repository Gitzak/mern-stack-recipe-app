class RecipeRepository {
    constructor(recipeModel) {
        this.recipeModel = recipeModel;
    }

    async getRecipeById (recipeId) {
        const recipe = await this.recipeModel.findById(recipeId)
        .populate("categories")
        .populate("comments.userId", "userName") // Populate the username from the User model
        .exec();
        return recipe;
    }
}

module.exports = { RecipeRepository };