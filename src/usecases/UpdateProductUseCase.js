const AppError = require('../shared/errors/AppError');

class UpdateProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id, data) {
    const productExists = await this.productRepository.findById(id);
    if (!productExists) {
      throw new AppError('Produto não encontrado.', 404);
    }

    const product = await this.productRepository.update(id, data);
    return product;
  }
}

module.exports = UpdateProductUseCase;
