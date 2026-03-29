const AppError = require('../shared/errors/AppError');

class GetOrderByIdUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute({ orderId, userId, userRole }) {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new AppError('Pedido não encontrado.', 404);
    }

    // Admins can see any order, users can only see their own
    if (userRole !== 'ADMIN' && order.userId !== userId) {
      throw new AppError('Você não tem permissão para ver este pedido.', 403);
    }

    return order;
  }
}

module.exports = GetOrderByIdUseCase;
