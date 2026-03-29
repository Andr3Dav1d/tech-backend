// Interface (contrato) para o repositório de categorias.
class CategoryRepository {
  async findByName(name) {
    throw new Error('Method not implemented');
  }

  async create({ name, slug }) {
    throw new Error('Method not implemented');
  }

  async findAll() {
    throw new Error('Method not implemented');
  }
}

module.exports = CategoryRepository;
