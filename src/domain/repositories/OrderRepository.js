// Interface (contrato) para o repositório de pedidos.
class OrderRepository {
  async create(orderData) {
    throw new Error('Method not implemented');
  }

  async findByUserId(userId) {
    throw new Error('Method not implemented');
  }

  async findById(orderId, userId) {
    throw new Error('Method not implemented');
  }
}

module.exports = OrderRepository;
