const CONSTANTS = require("../constants");

class RecipeService {
    constructor(recipeRepo) {
        this.recipeRepo = recipeRepo;
    }

    async getRecipeById(req) {
        const response = {};
        
        const recipeId = req.params.id;
        const recipe = await this.recipeRepo.getRecipeById(recipeId);
       
        if (!recipe) {
            response.message = CONSTANTS.SERVER_ERROR;
            response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
            return response;
        }
        response.message = "OK";
        response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
        response.data = recipe;

        return response;
    }

}

module.exports = { RecipeService };