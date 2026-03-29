const AppError = require('../shared/errors/AppError');

class GetProductByIdUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new AppError('Produto não encontrado.', 404);
    }
    return product;
  }
}

module.exports = GetProductByIdUseCase;
