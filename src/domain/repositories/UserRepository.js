// Interface (contrato) para o repositório de usuários.
// Em JavaScript, isso é mais conceitual.
// A implementação concreta estará em infra/repositories.

class UserRepository {
  async findByEmail(email) {
    throw new Error('Method not implemented');
  }

  async create(user) {
    throw new Error('Method not implemented');
  }
}

module.exports = UserRepository;
