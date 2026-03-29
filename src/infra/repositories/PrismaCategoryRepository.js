const CategoryRepository = require('../../domain/repositories/CategoryRepository');
const prisma = require('../database/prisma/client');

class PrismaCategoryRepository extends CategoryRepository {
  async findByName(name) {
    return await prisma.category.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } },
    });
  }

  async create({ name, slug }) {
    return await prisma.category.create({
      data: {
        name,
        slug,
      },
    });
  }

  async findAll() {
    return await prisma.category.findMany();
  }
}

module.exports = PrismaCategoryRepository;
