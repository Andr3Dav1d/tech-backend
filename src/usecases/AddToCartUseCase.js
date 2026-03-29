const AppError = require('../shared/errors/AppError');

class AddToCartUseCase {
  constructor(cartRepository, productRepository) {
    this.cartRepository = cartRepository;
    this.productRepository = productRepository;
  }

  async execute({ userId, productId, quantity }) {
    if (!productId || !quantity) {
      throw new AppError('ID do produto e quantidade são obrigatórios.');
    }

    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new AppError('Produto não encontrado.', 404);
    }

    if (product.stock < quantity) {
      throw new AppError('Estoque insuficiente.', 400);
    }

    const existingItem = await this.cartRepository.findItem(userId, productId);

    if (existingItem) {
      // Se o item já existe, atualiza a quantidade
      const newQuantity = existingItem.quantity + quantity;
      if (product.stock < newQuantity) {
        throw new AppError('Estoque insuficiente.', 400);
      }
      return await this.cartRepository.updateItem(existingItem.id, newQuantity);
    } else {
      // Se não existe, adiciona novo item
      return await this.cartRepository.addItem(userId, productId, quantity);
    }
  }
}

module.exports = AddToCartUseCase;
