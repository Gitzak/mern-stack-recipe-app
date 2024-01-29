class CategoryRepository {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  async createCategory(categoryEntry) {
    const category = await this.categoryModel.create(categoryEntry);
    return category;
  }

  async updateCategory(categoryId, categoryEntry) {
    const updatedCategory = await this.categoryModel.findOneAndUpdate(
      { _id: categoryId },
      categoryEntry,
      { upsert: false, new: true },
    );
    return updatedCategory;
  }

  async getCategories(skip, limit, sort) {
    const categories = await this.categoryModel
      .aggregate([{ $sort: { categoryName: -1 } }])
      .skip(skip)
      .limit(limit)
      .exec();
    return categories;
  }

  async searchCategories(query, skip, limit, sort) {
    const queryOptions = {
      $or: [{ categoryName: { $regex: query, $options: "i" } }],
    };

    const catefories = await this.categoryModel
      .find(queryOptions)
      .sort({ categoryName: sort === "ASC" ? 1 : -1 })
      .skip(skip)
      .limit(limit);

    return catefories;
  }

  async findCategoryById(categoryId) {
    const category = await this.categoryModel.findOne({ _id: categoryId });
    return category;
  }

  async hasChildCategories(categoryId) {
    const childCategories = await this.categoryModel.find({
      parentId: categoryId,
    });
    return childCategories.length > 0;
  }

  async DeleteCategory(categoryId) {
    const deletedCategory =
      await this.categoryModel.findByIdAndDelete(categoryId);
    return deletedCategory;
  }
}

module.exports = { CategoryRepository };
