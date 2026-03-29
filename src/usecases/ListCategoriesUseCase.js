class ListCategoriesUseCase {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute() {
    const categories = await this.categoryRepository.findAll();
    return categories;
  }
}

module.exports = ListCategoriesUseCase;
