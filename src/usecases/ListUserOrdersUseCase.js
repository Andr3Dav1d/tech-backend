class ListUserOrdersUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(userId) {
    const orders = await this.orderRepository.findByUserId(userId);
    return orders;
  }
}

module.exports = ListUserOrdersUseCase;
