const UserRepository = require('../../domain/repositories/UserRepository');
const prisma = require('../database/prisma/client');

class PrismaUserRepository extends UserRepository {
  async findByEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async create({ name, email, password }) {
    return await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }
}

module.exports = PrismaUserRepository;
