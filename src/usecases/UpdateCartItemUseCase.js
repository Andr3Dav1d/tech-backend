const AppError = require('../shared/errors/AppError');

class UpdateCartItemUseCase {
  constructor(cartRepository, productRepository) {
    this.cartRepository = cartRepository;
    this.productRepository = productRepository;
  }

  async execute({ itemId, quantity, userId }) {
    if (!quantity || quantity <= 0) {
      throw new AppError('A quantidade deve ser um número positivo.', 400);
    }

    const item = await this.cartRepository.findItemById(itemId);

    if (!item || item.userId !== userId) {
      throw new AppError('Item do carrinho não encontrado ou não pertence ao usuário.', 404);
    }

    const product = await this.productRepository.findById(item.productId);
    if (product.stock < quantity) {
      throw new AppError('Estoque insuficiente.', 400);
    }

    const updatedItem = await this.cartRepository.updateItem(itemId, quantity);
    return updatedItem;
  }
}

module.exports = UpdateCartItemUseCase;
