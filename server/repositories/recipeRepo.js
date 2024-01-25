const CONSTANTS = require("../constants/index");

class RecipeRepo {
    constructor(recipeModel) {
        this.recipeModel = recipeModel;
    }

    async GetRecipes(){
        return await this.recipeModel.find({});
    }

    async UpdateRecipe(id, recipe){
        return await this.recipeModel.findByIdAndUpdate(id, recipe, {runValidators: true, new: true});
    }

    async DeleteRecipe(id){
        return await this.recipeModel.findByIdAndDelete(id);
    }
}

module.exports = { RecipeRepo };

