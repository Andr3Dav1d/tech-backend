const AppError = require('../shared/errors/AppError');

class RemoveFromCartUseCase {
  constructor(cartRepository) {
    this.cartRepository = cartRepository;
  }

  async execute({ itemId, userId }) {
    const item = await this.cartRepository.findItemById(itemId);

    if (!item || item.userId !== userId) {
      throw new AppError('Item do carrinho não encontrado ou não pertence ao usuário.', 404);
    }

    await this.cartRepository.removeItem(itemId);
  }
}

module.exports = RemoveFromCartUseCase;
