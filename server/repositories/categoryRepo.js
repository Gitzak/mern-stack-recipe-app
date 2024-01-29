class CategoryRepository {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  async createCategory(categoryEntry) {
    return this.categoryModel.create(categoryEntry);
  }

  async updateCategory(categoryId, categoryEntry) {
    return await this.categoryModel.findByIdAndUpdate(
      categoryId,
      categoryEntry,
      { runValidators: false, new: true, timeout: 30000 }, // Increase timeout to 30 seconds
    );
  }

  async getCategories(skip, limit, sort) {
    return await this.categoryModel
      .aggregate([{ $sort: { categoryName: -1 } }])
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async searchCategories(query, skip, limit, sort) {
    const queryOptions = {
      $or: [{ categoryName: { $regex: query, $options: "i" } }],
    };

    return await this.categoryModel
      .find(queryOptions)
      .sort({ categoryName: sort === "ASC" ? 1 : -1 })
      .skip(skip)
      .limit(limit);
  }

  async findCategoryById(categoryId) {
    return await this.categoryModel.findOne({ _id: categoryId });
  }

  async hasChildCategories(categoryId) {
    const childCategories = await this.categoryModel.find({
      parentId: categoryId,
    });
    return childCategories.length > 0;
  }

  async DeleteCategory(categoryId) {
    return await this.categoryModel.findByIdAndDelete(categoryId);
  }
}

module.exports = { CategoryRepository };
