const AppError = require('../shared/errors/AppError');

class CreateCategoryUseCase {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute({ name }) {
    if (!name) {
      throw new AppError('O nome da categoria é obrigatório.');
    }

    const categoryExists = await this.categoryRepository.findByName(name);

    if (categoryExists) {
      throw new AppError('Esta categoria já existe.', 409);
    }

    const slug = name.toLowerCase().replace(/ /g, '-');

    const category = await this.categoryRepository.create({ name, slug });

    return category;
  }
}

module.exports = CreateCategoryUseCase;
