const AppError = require('../shared/errors/AppError');

class CreateProductUseCase {
  constructor(productRepository, categoryRepository) {
    this.productRepository = productRepository;
    this.categoryRepository = categoryRepository;
  }

  async execute({
    name,
    description,
    price,
    imageUrl,
    stock,
    featured,
    categoryId,
  }) {
    if (!name || !description || !price || !stock || !categoryId) {
      throw new AppError('Todos os campos obrigatórios devem ser preenchidos.');
    }

    // Em um caso real, seria bom verificar se a categoria existe.
    // Como o Prisma já faz isso com a foreign key, vamos confiar nele por enquanto.

    const product = await this.productRepository.create({
      name,
      description,
      price,
      imageUrl,
      stock,
      featured,
      categoryId,
    });

    return product;
  }
}

module.exports = CreateProductUseCase;
