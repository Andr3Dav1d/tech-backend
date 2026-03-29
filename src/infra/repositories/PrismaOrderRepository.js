const OrderRepository = require('../../domain/repositories/OrderRepository');
const prisma = require('../database/prisma/client');

class PrismaOrderRepository extends OrderRepository {
  async create(orderData) {
    // A lógica de criação está no UseCase para garantir a transação
    // Este método pode ser usado para criações mais simples se necessário
    return await prisma.order.create({
      data: orderData,
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async findByUserId(userId) {
    return await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    });
  }

  async findById(orderId) {
    return await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }
}

module.exports = PrismaOrderRepository;
