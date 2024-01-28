const CONSTANTS = require("../constants");
// const cloudinary = require("../utils/cloudinary");
// const { checkCategoryById } = require("../controllers/categoriesController");

class RecipeService {
    constructor(recipeRepo) {
        this.recipeRepo = recipeRepo;
    }

    async getRecipeById(req) {
        const response = {};
        
        const recipeId = req.params.id;
        const recipe = await this.recipeRepo.getRecipeById(recipeId);
       
        if (!recipe) {
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
            // const categoriesArray = categories.split(",");

            // Check if any of the categories don't exist
            // for (const categoryId of categoriesArray) {
            //     const category = await checkCategoryById(categoryId);
            //     if (category?.status === 404) {
            //         response.message = "You cannot create this product because one or more categories were not found.";
            //         response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
            //         return response;
            //     }
            // }

            // Continue with the image uploading logic
            // const imagesUrlPromises = req.files.map((file) => {
            //   return new Promise((resolve, reject) => {
            //     cloudinary.uploader.upload(file.path, (err, result) => {
            //       if (err) {
            //         reject(err);
            //       } else {
            //         resolve(result.secure_url);
            //       }
            //     });
            //   });
            // });

            // const imagesUrls = await Promise.all(imagesUrlPromises);

            // Create a new product object
            const newRecipe = {
                name,
                ingredients,
                rating,
                userOwner,
                nutrition,
                // recipeImages: imagesUrls,
                comments,
                name,
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
        response.message = "OK";
        response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
        response.data = recipe;

        return response;
    }

}

module.exports = { RecipeService };
    }
}

module.exports = { RecipeService };
