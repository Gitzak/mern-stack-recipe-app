const CONSTANTS = require("../constants");

class CategoryService {
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
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

        const updatedCategory = await this.categoryRepo.updateCategory(
            categoryId,
            newCategory
        );

        if (!updatedCategory) {
            response.message = CONSTANTS.SERVER_ERROR;
            response.status = CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE;
            return response;
        }

        response.message = "UPDATED";
        response.status = CONSTANTS.SERVER_UPDATED_HTTP_CODE;

        return response;
    }
}

module.exports = { CategoryService };
