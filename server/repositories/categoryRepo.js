class CategoryRepository {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }

    async createCategory(categoryEntry) {
        const category = await this.categoryModel.create(categoryEntry);
        return category;
    }

    async updateCategory(categoryId, categoryEntry) {
        const updatedCategory = await this.categoryModel.findOneAndUpdate({ _id: categoryId }, categoryEntry, { upsert: false, new: true });
        return updatedCategory;
    }

}

module.exports = { CategoryRepository };
