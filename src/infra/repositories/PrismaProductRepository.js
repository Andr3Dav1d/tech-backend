const ProductRepository = require('../../domain/repositories/ProductRepository');
const prisma = require('../database/prisma/client');

class PrismaProductRepository extends ProductRepository {
  async create(productData) {
    return await prisma.product.create({
      data: productData,
    });
  }

  async findAll({ category, search, page = 1, limit = 10, orderBy = 'createdAt_desc' }) {
    const where = {};

    if (category) {
      where.category = { slug: category };
    }

    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive',
      };
    }

    const [orderByField, orderDirection] = orderBy.split('_');

    const products = await prisma.product.findMany({
      where,
      skip: (page - 1) * limit,
      take: parseInt(limit),
      orderBy: {
        [orderByField]: orderDirection,
      },
      include: {
        category: true,
      },
    });

    const total = await prisma.product.count({ where });

    return {
      data: products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id) {
    return await prisma.product.findUnique({
      where: { id },
      include: { category: true, reviews: { include: { user: true } } },
    });
  }

  async update(id, productData) {
    return await prisma.product.update({
      where: { id },
      data: productData,
    });
  }

  async delete(id) {
    return await prisma.product.delete({
      where: { id },
    });
  }

  async findFeatured() {
    return await prisma.product.findMany({
      where: { featured: true },
      include: { category: true },
    });
  }
}

module.exports = PrismaProductRepository;
