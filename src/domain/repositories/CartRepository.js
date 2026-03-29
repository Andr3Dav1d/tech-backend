// Interface (contrato) para o repositório de carrinho.
class CartRepository {
  async findByUserId(userId) {
    throw new Error('Method not implemented');
  }

  async findItem(userId, productId) {
    throw new Error('Method not implemented');
  }

  async addItem(userId, productId, quantity) {
    throw new Error('Method not implemented');
  }

  async updateItem(itemId, quantity) {
    throw new Error('Method not implemented');
  }

  async removeItem(itemId) {
    throw new Error('Method not implemented');
  }

  async clearCart(userId) {
    throw new Error('Method not implemented');
  }
}

module.exports = CartRepository;
