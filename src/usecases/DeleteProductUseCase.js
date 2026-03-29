const AppError = require('../shared/errors/AppError');

class DeleteProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id) {
    const productExists = await this.productRepository.findById(id);
    if (!productExists) {
      throw new AppError('Produto não encontrado.', 404);
    }

    await this.productRepository.delete(id);
  }
}

module.exports = DeleteProductUseCase;
