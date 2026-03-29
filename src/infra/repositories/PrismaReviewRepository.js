const ReviewRepository = require('../../domain/repositories/ReviewRepository');
const prisma = require('../database/prisma/client');

class PrismaReviewRepository extends ReviewRepository {
  async create(reviewData) {
    return await prisma.review.create({
      data: reviewData,
    });
  }

  async findByProduct(productId) {
    return await prisma.review.findMany({
      where: { productId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

module.exports = PrismaReviewRepository;
