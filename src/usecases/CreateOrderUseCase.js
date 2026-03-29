const AppError = require('../shared/errors/AppError');

class CreateOrderUseCase {
  constructor(
    orderRepository,
    cartRepository,
    productRepository,
    prismaInstance
  ) {
    this.orderRepository = orderRepository;
    this.cartRepository = cartRepository;
    this.productRepository = productRepository;
    this.prisma = prismaInstance;
  }

  async execute({ userId }) {
    const cartItems = await this.cartRepository.findByUserId(userId);

    if (cartItems.length === 0) {
      throw new AppError('Seu carrinho está vazio.', 400);
    }

    return this.prisma.$transaction(async (tx) => {
      let total = 0;
      const orderItemsData = [];

      for (const item of cartItems) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (product.stock < item.quantity) {
          throw new AppError(
            `Estoque insuficiente para o produto: ${product.name}`,
            400
          );
        }

        const unitPrice = product.price;
        total += unitPrice * item.quantity;

        orderItemsData.push({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: unitPrice,
        });

        await tx.product.update({
          where: { id: item.productId },
          data: { stock: product.stock - item.quantity },
        });
      }

      const order = await tx.order.create({
        data: {
          userId,
          total,
          items: {
            create: orderItemsData,
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      await tx.cartItem.deleteMany({
        where: { userId },
      });

      return order;
    });
  }
}

module.exports = CreateOrderUseCase;
