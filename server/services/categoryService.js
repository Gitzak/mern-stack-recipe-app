const CONSTANTS = require("../constants");
const cloudinary = require("../utils/cloudinary");

class CategoryService {
    constructor(categoryRepo, RecipeRepo) {
        this.categoryRepo = categoryRepo;
        this.recipeRepo = RecipeRepo;
    }

    async createCategory(req) {
        const response = {};
        const { categoryName, description } = req.body;

        const file = req.file;
        let imageUrl = null;

        if (file) {
            imageUrl = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload(file.path, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.secure_url);
                    }
                });
            });
        }
        console.log('url', imageUrl);
        const newCategory = {
            categoryName,
            description,
            categoryImage: imageUrl ? imageUrl : null,
        };

        const category = await this.categoryRepo.createCategory(newCategory);

        if (!category) {
            response.message = CONSTANTS.SERVER_ERROR;
            response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
            return response;
        }

        response.message = "CREATED";
        response.status = CONSTANTS.SERVER_CREATED_HTTP_CODE;

        return response;
    }

    async updateCategory(req) {
        const response = {};
        const categoryId = req.params.id;
        const { categoryName, description } = req.body;

        const file = req.file;
        let imageUrl = null;

        if (file) {
            imageUrl = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload(file.path, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.secure_url);
                    }
                });
            });
        }

        const newCategory = {
            categoryName,
            description,
            categoryImage: imageUrl ? imageUrl : null,
        };

        const updatedCategory = await this.categoryRepo.updateCategory(categoryId, newCategory);

        if (!updatedCategory) {
            response.message = CONSTANTS.SERVER_ERROR;
            response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
            return response;
        }

        response.message = "UPDATED";
        response.status = CONSTANTS.SERVER_UPDATED_HTTP_CODE;
        console.log(response);
        return response;
    }

    async getCategories(req) {
        const query = req.query.query;
        const response = {};
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort || "ASC";
        const pageSize = 10;
        const skip = (page - 1) * pageSize;
        const limit = pageSize;
        if (query) {
            try {
                const searchedCategories = await this.categoryRepo.searchCategories(query, skip, limit, sort);
                if (!searchedCategories) {
                    response.message = CONSTANTS.CATEGORY_NOT_FOUND;
                    response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
                    return response;
                }
                response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
                response.data = searchedCategories;
                return response;
            } catch (error) {
                response.message = error.message;
                response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
                return response;
            }
        } else {
            const categories = await this.categoryRepo.getCategories(skip, limit, sort);
            response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
            response.data = categories;
            return response;
        }
    }

    async getCategoryById(req) {
        const response = {};
        try {
            const categoryId = req.params.id;
            const foundedCategory = await this.categoryRepo.findCategoryById(categoryId);

            if (!foundedCategory) {
                response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
                response.message = CONSTANTS.CATEGORY_NOT_FOUND;
                return response;
            }
            response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
            response.data = foundedCategory;
            return response;
        } catch (error) {
            response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
            response.message = CONSTANTS.SERVER_ERROR;
            return response;
        }
    }

    async deleteCategory(req) {
        const response = {};

        try {
            const categoryId = req.params.id;

            // Check if the category has child categories
            const hasChildCategories = await this.categoryRepo.hasChildCategories(categoryId);

            if (hasChildCategories) {
                response.status = CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE;
                response.message = "You cannot delete this category because it has child categories";
                return response;
            }

            // Check if the category has Recipes
            const hasRecipes = await this.recipeRepo.hasRecipes(categoryId);

            if (hasRecipes) {
                response.status = CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE;
                response.message = "You cannot delete this category because it has Recipes";
                return response;
            }

            const deletedCategory = await this.categoryRepo.DeleteCategory(categoryId);

            if (!deletedCategory) {
                response.message = CONSTANTS.CATEGORY_NOT_FOUND;
                response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
                return response;
            }

            response.status = CONSTANTS.SERVER_OK_HTTP_CODE;
            response.message = CONSTANTS.CATEGORY_DELETED_SUCCESS;
            return response;
        } catch (error) {
            response.status = CONSTANTS.SERVER_ERROR_HTTP_CODE;
            response.message = CONSTANTS.SERVER_ERROR;
            return response;
        }
    }
}

module.exports = { CategoryService };
