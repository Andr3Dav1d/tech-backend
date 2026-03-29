const CartRepository = require('../../domain/repositories/CartRepository');
const prisma = require('../database/prisma/client');

class PrismaCartRepository extends CartRepository {
  async findByUserId(userId) {
    return await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });
  }

  async findItem(userId, productId) {
    return await prisma.cartItem.findFirst({
      where: { userId, productId },
    });
  }

  async findItemById(itemId) {
    return await prisma.cartItem.findUnique({
      where: { id: itemId },
    });
  }

  async addItem(userId, productId, quantity) {
    return await prisma.cartItem.create({
      data: {
        userId,
        productId,
        quantity,
      },
    });
  }

  async updateItem(itemId, quantity) {
    return await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });
  }

  async removeItem(itemId) {
    return await prisma.cartItem.delete({
      where: { id: itemId },
    });
  }

  async clearCart(userId) {
    return await prisma.cartItem.deleteMany({
      where: { userId },
    });
  }
}

module.exports = PrismaCartRepository;
