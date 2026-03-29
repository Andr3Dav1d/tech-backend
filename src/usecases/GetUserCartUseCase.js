class GetUserCartUseCase {
  constructor(cartRepository) {
    this.cartRepository = cartRepository;
  }

  async execute(userId) {
    const cartItems = await this.cartRepository.findByUserId(userId);
    return cartItems;
  }
}

module.exports = GetUserCartUseCase;
